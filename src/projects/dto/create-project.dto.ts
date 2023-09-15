import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateProjectDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  description: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  techStacks: string;

  @ApiProperty({ type: Status, example: { id: 1, name: 'Active' } })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsOptional()
  aiTools?: number[];

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsOptional()
  employees?: number[];

  @ApiProperty({ type: String, format: 'date-time', nullable: true }) // Specify 'date-time' format
  @IsOptional()
  @IsISO8601() // Add IsISO8601 validator for ISO datetime timestamp
  startDate?: string;

  @ApiProperty({ type: Date, nullable: true })
  @IsOptional()
  @IsISO8601() // Add IsISO8601 validator for ISO datetime timestamp
  endDate?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  category?: string | null;

  @ApiProperty({ example: 'https://picsum.photos/200' })
  @IsOptional()
  iconUrl?: string;

  @ApiProperty({ example: 'PRJ-1234' })
  @IsOptional()
  projectCode?: string;

  @ApiProperty({ type: Number, nullable: true })
  @IsOptional()
  amountSaved?: number | null;
}
