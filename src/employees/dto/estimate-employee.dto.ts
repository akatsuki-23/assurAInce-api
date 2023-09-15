import { IsNotEmpty } from 'class-validator';
import { Employee } from '../entities/employee.entity';

export class EstimateEfficiency {
  @IsNotEmpty()
  userIDs: number[];

  @IsNotEmpty()
  expectedTimeForWorkInHr: number;
}

export class TeamWorkEfficiency {
  @IsNotEmpty()
  employees: Employee[];
  @IsNotEmpty()
  employeeCount: number;
  @IsNotEmpty()
  timeForWorkInHrWithAI: number;

  @IsNotEmpty()
  timeForWorkInHrWithOutAI: number;
}

export class TeamWorkEfficiencyList {
  @IsNotEmpty()
  teamEfficiencies: TeamWorkEfficiency[];
}
