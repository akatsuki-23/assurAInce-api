import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SocialServicesService } from './social-services.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { CreateSocialServiceDto } from './dto/create-social-services.dto';
import { SocialService } from './entities/social-services.entity';
import { UpdateSocialServiceDto } from './dto/update-social-services.dto';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Social Services')
@Controller({
  path: 'social-services',
  version: '1',
})
export class SocialServicesController {
  constructor(private readonly socialServicesService: SocialServicesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createSocialServiceDto: CreateSocialServiceDto,
  ): Promise<SocialService> {
    return this.socialServicesService.create(createSocialServiceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<SocialService>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.socialServicesService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<SocialService>> {
    return this.socialServicesService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateSocialServiceDto: UpdateSocialServiceDto,
  ): Promise<SocialService> {
    return this.socialServicesService.update(id, updateSocialServiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.socialServicesService.softDelete(id);
  }

  @Post('donate')
  @HttpCode(HttpStatus.CREATED)
  donate(): any {
    return {
      paymentStatus: 'success',
    };
  }
}
