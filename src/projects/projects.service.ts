import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { NullableType } from '../utils/types/nullable.type';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) { }

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsRepository.save(
      this.projectsRepository.create(createProjectDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Project[]> {
    return this.projectsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Project>): Promise<NullableType<Project>> {
    return this.projectsRepository.findOne({
      where: fields,
    });
  }

  update(id: Project['id'], payload: DeepPartial<Project>): Promise<Project> {
    return this.projectsRepository.save(
      this.projectsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Project['id']): Promise<void> {
    await this.projectsRepository.softDelete(id);
  }
}
