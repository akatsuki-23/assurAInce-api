import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ProjectPeople } from './entities/project-people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectPeople])],
  controllers: [ProjectsController],
  providers: [IsExist, IsNotExist, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule { }
