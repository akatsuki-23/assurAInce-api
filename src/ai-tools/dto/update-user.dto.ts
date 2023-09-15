import { PartialType } from '@nestjs/swagger';
import { CreateAiToolDto } from './create-ai-tool.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateAiToolDto extends PartialType(CreateAiToolDto) {
  @ApiProperty({ example: 'Chat GPT' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Code development' })
  @IsOptional()
  domain: string;

  @ApiProperty({ example: 'https://picsum.photos/200' })
  @IsOptional()
  iconUrl: string;

  @ApiProperty({ example: 1000.5 })
  @IsOptional()
  savingsPerProject: number;
}
