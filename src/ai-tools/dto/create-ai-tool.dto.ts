import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateAiToolDto {
  @ApiProperty({ example: 'Chat GPT' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Code development' })
  @IsNotEmpty()
  domain: string;
}
