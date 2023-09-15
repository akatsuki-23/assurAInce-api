import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { CreateAiToolProficiencyDto } from './create-ai-tool-proficiency.dto';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['Employee'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @IsOptional()
  skillSet?: string[];

  @IsOptional()
  domains?: string[];

  @IsOptional()
  careerDetails?: string | null;

  @IsOptional()
  aiToolProficiency?: number | null;

  @IsOptional()
  category?: string | null;

  @IsOptional()
  score?: number | null;
  @IsOptional()
  reportTo?: string | null;

  @IsOptional()
  skillSets?: string[];

  @IsOptional()
  activeStatus?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  profileUrl?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @IsOptional()
  @ApiProperty({ type: [CreateAiToolProficiencyDto] })
  @ValidateNested({ each: true }) // Enable nested validation for each item in the array
  @Type(() => CreateAiToolProficiencyDto)
  aiTools: CreateAiToolProficiencyDto[];
}
