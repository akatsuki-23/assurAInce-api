import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAiToolProficiencyDto {
  @ApiProperty({ example: 'Chat GPT' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 5.0 })
  @IsNotEmpty()
  proficiency: number;
}
