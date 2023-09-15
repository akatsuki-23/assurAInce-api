import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, In, Repository } from 'typeorm';
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
}
