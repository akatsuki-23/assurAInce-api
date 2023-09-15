import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { NullableType } from '../utils/types/nullable.type';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AiToolsService } from 'src/ai-tools/ai-tools.service';
import { EmployeesService } from 'src/employees/employee.service';
import { AiTools } from 'src/ai-tools/entities/ai-tools.entity';
import { Employee } from 'src/employees/entities/employee.entity';

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
    private readonly aiToolsService: AiToolsService,
    private readonly employeesService: EmployeesService,
  ) {}

  private extractProjectFieldsFromDto(
    dto: CreateProjectDto | UpdateProjectDto,
  ) {
    const { name, description, techStacks, status } = dto;
    return { name, description, techStacks, status };
  }

  private async fetchAITools(
    aiTools: number[] | undefined,
  ): Promise<AiTools[]> {
    if (aiTools) {
      const existingAITools = await this.aiToolsService.findByIds(aiTools);
      if (existingAITools.length !== aiTools.length) {
        throw new BadRequestException(
          'One or more AI tool IDs do not exist in the database',
        );
      }
      return existingAITools;
    }
    return [];
  }

  private async fetchEmployees(
    employees: number[] | undefined,
  ): Promise<Employee[]> {
    if (employees) {
      const existingEmployees = await this.employeesService.findByIds(
        employees,
      );
      if (existingEmployees.length !== employees.length) {
        throw new BadRequestException(
          'One or more employee IDs do not exist in the database',
        );
      }
      return existingEmployees;
    }
    return [];
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { aiTools, employees } = createProjectDto;
    const aiToolIds = aiTools?.map((id) => Number(id));
    const employeeIds = employees?.map((employee) => Number(employee));

    // Validate AITools
    if (!aiToolIds || !Array.isArray(aiToolIds)) {
      throw new BadRequestException('aiTools must be an array of IDs');
    }
    const projectAiTools = await this.fetchAITools(aiToolIds);

    // Validate Employees
    if (!employeeIds || !Array.isArray(employeeIds)) {
      throw new BadRequestException('aiTools must be an array of IDs');
    }
    const projectEmployees = await this.fetchEmployees(employeeIds);

    const projectDto = this.extractProjectFieldsFromDto(createProjectDto);
    const project = this.projectsRepository.create(projectDto);

    // Validate AITools presence
    project.aiTools = projectAiTools;
    project.employees = projectEmployees;

    return this.projectsRepository.save(project);
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Project[]> {
    return this.projectsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['aiTools', 'employees'],
    });
  }

  findOne(fields: EntityCondition<Project>): Promise<NullableType<Project>> {
    return this.projectsRepository.findOne({
      where: fields,
      relations: ['aiTools', 'employees'],
    });
  }

  async update(id: number, payload: UpdateProjectDto): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new BadRequestException('Project does not exist in the database.');
    }
    const projectDTO = this.extractProjectFieldsFromDto(payload);
    project.name = projectDTO.name ? projectDTO.name : project.name;
    project.description = projectDTO.description
      ? projectDTO.description
      : project.description;
    project.techStacks = projectDTO.techStacks
      ? projectDTO.techStacks
      : project.techStacks;
    project.status = projectDTO.status ? projectDTO.status : project.status;

    const { aiTools, employees } = payload;
    const aiToolIds = aiTools?.map((id) => Number(id));
    const employeeIds = employees?.map((employee) => Number(employee));

    // Validate AITools
    if (aiToolIds && !Array.isArray(aiToolIds)) {
      throw new BadRequestException('aiTools must be an array of IDs');
    }
    const projectAiTools = await this.fetchAITools(aiToolIds);

    // Validate Employees
    if (employeeIds && !Array.isArray(employeeIds)) {
      throw new BadRequestException('Employee must be an array of IDs');
    }
    const projectEmployees = await this.fetchEmployees(employeeIds);

    project.employees = projectEmployees;
    project.aiTools = projectAiTools;
    return this.projectsRepository.save(project);
  }

  async softDelete(id: Project['id']): Promise<void> {
    await this.projectsRepository.softDelete(id);
  }

  estimateProject(
    estimation: ProjectEstimation,
    aiAssistance: boolean = false,
  ): ProjectEstimationResult {
    if (aiAssistance) {
      const aiAdjustedDuration = this.callAiTool(estimation);
      return aiAdjustedDuration;
    }

    const { numberOfTasks, averageTaskCompletionTime, teamSize, hourlyRate } =
      estimation;
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
