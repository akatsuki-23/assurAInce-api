import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  create(createProfileDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesRepository.save(
      this.employeesRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Employee[]> {
    return this.employeesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Employee>): Promise<NullableType<Employee>> {
    return this.employeesRepository.findOne({
      where: fields,
    });
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
}
