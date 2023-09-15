import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';

export class CreateAiToolDto {
  @ApiProperty({ example: 'Chat GPT' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Code development' })
  @IsNotEmpty()
  domain: string;

  @ApiProperty({ example: 'https://picsum.photos/200' })
  @IsOptional()
  iconUrl: string;

  @IsOptional()
  employees: Employee[];
}
