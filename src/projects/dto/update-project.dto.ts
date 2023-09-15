import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;
}
