import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ProjectPeople } from './entities/project-people.entity';
import { AiToolsService } from 'src/ai-tools/ai-tools.service';
import { EmployeesService } from 'src/employees/employee.service';
import { AiToolsModule } from 'src/ai-tools/ai-tools.module';
import { EmployeesModule } from 'src/employees/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectPeople]), AiToolsModule, EmployeesModule],
  controllers: [ProjectsController],
  providers: [IsExist, IsNotExist, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule { }
