import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { NullableType } from '../utils/types/nullable.type';
import { Project } from './entities/project.entity';


interface ProjectEstimation {
  numberOfTasks: number;
  averageTaskCompletionTime: number; // in hours
  teamSize: number;
  hourlyRate: number;
}


interface ProjectEstimationResult {
  cost: number;
  duration: number; // in days
}

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


  estimateProject(estimation: ProjectEstimation, aiAssistance: boolean = false): ProjectEstimationResult {
    if (aiAssistance) {
      const aiAdjustedDuration = this.callAiTool(estimation);
      return aiAdjustedDuration
    }

    const { numberOfTasks, averageTaskCompletionTime, teamSize, hourlyRate } = estimation;
    const totalWorkHours = numberOfTasks * averageTaskCompletionTime;
    const totalLaborCost = totalWorkHours * teamSize * hourlyRate;

    // Assume 20% additional for other expenses (overheads, materials, etc.)
    const additionalCost = 0.2 * totalLaborCost;
    const totalCost = totalLaborCost + additionalCost;

    // Calculate the project duration
    const totalWorkDays = totalWorkHours / (teamSize * 8); // Assuming 8 hours workday


    return {
      cost: totalCost,
      duration: totalWorkDays,
    };
  }

  callAiTool(estimation: ProjectEstimation): ProjectEstimationResult {
    // Simulated AI tool output
    const aiCostAdjustmentFactor = 0.9; // For example, AI suggests the project might cost 10% less
    const aiDurationAdjustmentFactor = 0.8; // For example, AI suggests the project might be completed 20% faster

    const estimatedResult = this.estimateProject(estimation);

    return {
      cost: estimatedResult.cost * aiCostAdjustmentFactor,
      duration: estimatedResult.duration * aiDurationAdjustmentFactor,
    };
  }

}
