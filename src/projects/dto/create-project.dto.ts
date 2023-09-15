import { ApiProperty } from '@nestjs/swagger';
import {
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
  tech_stacks: string;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;
}
