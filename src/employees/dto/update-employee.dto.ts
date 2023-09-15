import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @Validate(IsNotExist, ['Employee'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  provider?: string;

  @IsOptional()
  domains?: string[];

  @IsOptional()
  skillSet?: string[];

  @IsOptional()
  careerDetails?: string | null;

  @IsOptional()
  aiToolProficiency?: number | null;

  @IsOptional()
  domainProficiency?: number | null;

  @IsOptional()
  category?: string | null;

  @IsOptional()
  score?: number | null;

  @IsOptional()
  activeStatus?: string;

  @IsOptional()
  skillSets?: string[];

  @IsOptional()
  profileUrl?: string | null;

  @IsOptional()
  reportTo?: string | null;
  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;
}
