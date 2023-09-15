import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, In, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { NullableType } from '../utils/types/nullable.type';
import { EmployeeAiToolProficiency } from 'src/ai-tools-proficiency/entities/ai-tools-proficiency.entity';
import { AiTools } from 'src/ai-tools/entities/ai-tools.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(EmployeeAiToolProficiency)
    private employeesAiToolProfRepository: Repository<EmployeeAiToolProficiency>,
    @InjectRepository(AiTools)
    private aiToolProfRepository: Repository<AiTools>,
  ) {}

  async create(createProfileDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = plainToClass(Employee, createProfileDto);

    const employee = await this.employeesRepository.create(newEmployee);

    return employee;

    // const employeeAiToolProficiency = new EmployeeAiToolProficiency[];
    // let list: Array<EmployeeAiToolProficiency>;
    // const employeesWithAdditionalData = await Promise.all(
    //   createProfileDto.aiTools.map(async (element) => {
    //     const aiTool = await this.aiToolProfRepository.findOne({
    //       where: { name: element.name },
    //     });
    //     if (aiTool) {
    //       const e = new EmployeeAiToolProficiency();
    //       e.aiTool = aiTool;
    //       list.push(e);
    //     }
    //   }
    //   return list
    //   ),
    // );
    // await this.employeesAiToolProfRepository.save(employeesWithAdditionalData);
    // this.employeesRepository
    //   .save(this.employeesRepository.create(createProfileDto))
    //   .then((employee) => {
    //     const employeeAiToolProficiency = new EmployeeAiToolProficiency();
    //     employeeAiToolProficiency.employee = employee;
    //     employeeAiToolProficiency.aiTool = ;
    //     // employeeAiToolProficiency.aiTool = aiTool;
    //     // employeeAiToolProficiency.proficiency = proficiency;
    //     // const aitool = this.employeesAiToolProfRepository.save();
    //     return employee;
    //   })
    //   .catch((err) => {
    //     console.log;
    //   });
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
