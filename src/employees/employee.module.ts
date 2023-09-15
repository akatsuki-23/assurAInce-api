import { Module } from '@nestjs/common';
import { EmployeesService } from './employee.service';
import { EmployeesController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [IsExist, IsNotExist, EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
