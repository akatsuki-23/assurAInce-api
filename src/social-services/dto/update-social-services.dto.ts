import { PartialType } from '@nestjs/swagger';
import { CreateSocialServiceDto } from './create-social-services.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUrl, IsEmail, IsNumber } from 'class-validator';

export class UpdateSocialServiceDto extends PartialType(
  CreateSocialServiceDto,
) {
  @ApiProperty({ example: 'Charity Organization XYZ' })
  @IsOptional()
  organizationName: string;

  @ApiProperty({ example: 'https://example.com/donation' })
  @IsOptional()
  @IsUrl()
  donationURL: string | null;

  @ApiProperty({ example: 'contact@example.com' })
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: '123-456-7890' })
  @IsOptional()
  phoneNumber: string | null;

  @ApiProperty({ example: '123 Main St, City' })
  @IsOptional()
  address: string | null;

  @ApiProperty({ example: 100.5 })
  @IsOptional()
  @IsNumber()
  donationAmount: number | null;

  @ApiProperty({ example: 'https://example.com' })
  @IsOptional()
  @IsUrl()
  companyURL: string | null;
}
