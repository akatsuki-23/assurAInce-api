import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, In, Repository } from 'typeorm';
import {
  EstimateEfficiency,
  TeamWorkEfficiency,
  TeamWorkEfficiencyList,
} from './dto/estimate-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { NullableType } from '../utils/types/nullable.type';
import { EmployeeAiToolProficiency } from 'src/ai-tools-proficiency/entities/ai-tools-proficiency.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async create(createProfileDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = plainToInstance(Employee, createProfileDto);
    delete newEmployee['aiTools'];

    const newEmployeeAiToolProficiencyList: EmployeeAiToolProficiency[] = [];

    createProfileDto.aiTools.forEach((data) => {
      const newEmployeeAiToolProficiency = new EmployeeAiToolProficiency();

      newEmployeeAiToolProficiency.aiToolId = data.id;
      newEmployeeAiToolProficiency.proficiency = data.proficiency;

      newEmployeeAiToolProficiencyList.push(newEmployeeAiToolProficiency);
    });

    newEmployee.employeeAiToolProficiency = newEmployeeAiToolProficiencyList;

    const employee = await this.employeesRepository.save(newEmployee);

    return employee;
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Employee[]> {
    return this.employeesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findOne(
    fields: EntityCondition<Employee>,
  ): Promise<NullableType<Employee>> {
    const employees = await this.employeesRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.employeeAiToolProficiency', 'proficiency')
      .leftJoinAndSelect('proficiency.aiTool', 'aiTool')
      .where('employee.id = :id', { id: fields.id }) // Use the id in the WHERE clause
      .getOne();

    return employees;
  }

  update(
    id: Employee['id'],
    payload: DeepPartial<Employee>,
  ): Promise<Employee> {
    return this.employeesRepository.save(
      this.employeesRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Employee['id']): Promise<void> {
    await this.employeesRepository.softDelete(id);
  }

  async findByIds(ids: number[]): Promise<Employee[]> {
    return this.employeesRepository.findBy({ id: In(ids) });
  }
  combinations = (elements: Employee[]): Employee[][] => {
    if (elements.length == 1) {
      return [elements];
    } else {
      const tail = this.combinations(elements.slice(1));
      return tail.reduce(
        (combos, combo) => {
          combos.push([elements[0], ...combo]);
          return combos;
        },
        [[elements[0]], ...tail],
      );
    }
  };

  effSum = (elements: Employee[]): number | null => {
    if (elements.length == undefined) {
      return 0;
    }
    return elements.reduce(
      (sum: number, emp) =>
        sum + Number(emp.aiToolProficiency == null ? 0 : emp.aiToolProficiency),
      0,
    );
  };

  async GetBestTeam(
    body: EstimateEfficiency,
  ): Promise<Map<number, string[]> | null> {
    return this.findByIds(body.userIDs)
      .then((employees) => {
        const employeeCombination = this.combinations(employees);
        const myMap = new Map<number, string[]>();
        employeeCombination.forEach((employees) => {
          if (myMap[employees.length] == undefined) {
            myMap[employees.length] = employees;
          }
          const prevSumEff = this.effSum(myMap[employees.length]);
          const currentEff = this.effSum(employees);
          if (currentEff != null) {
            if (prevSumEff == null || prevSumEff < currentEff) {
              myMap[employees.length] = employees;
            }
          }
        });

        console.log(myMap);
        return myMap;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  async estimateEfficiency(
    body: EstimateEfficiency,
  ): Promise<TeamWorkEfficiencyList> {
    const twfl = new TeamWorkEfficiencyList();
    twfl.teamEfficiencies = [];
    const e = await this.GetBestTeam(body);
    let i = 1;
    if (e != null) {
      while (e[i] != null) {
        if (i == body.userIDs.length || i == body.userIDs.length - 1) {
          const es = this.effSum(e[i]);
          if (es != null) {
            const eff = 1 + es / i;
            const twf = new TeamWorkEfficiency();
            twf.timeForWorkInHrWithAI = body.expectedTimeForWorkInHr / eff / i;
            twf.timeForWorkInHrWithOutAI = body.expectedTimeForWorkInHr / i;
            twf.employees = e[i];
            twf.employeeCount = i;
            twfl.teamEfficiencies.push(twf);
          }
        }
        i++;
      }
    }
    return twfl;
  }
}
