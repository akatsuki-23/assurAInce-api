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
import { AiToolsService } from './ai-tools.service';
import { CreateAiToolDto } from './dto/create-ai-tool.dto';
import { UpdateAiToolDto } from './dto/update-ai-tools.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { AiTools } from './entities/ai-tools.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('AI Tools')
@Controller({
  path: 'ai-tools',
  version: '1',
})
export class AiToolsController {
  constructor(private readonly aiToolsService: AiToolsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAiToolDto: CreateAiToolDto): Promise<AiTools> {
    return this.aiToolsService.create(createAiToolDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<AiTools>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.aiToolsService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<AiTools>> {
    return this.aiToolsService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateAiToolDto: UpdateAiToolDto,
  ): Promise<AiTools> {
    return this.aiToolsService.update(id, updateAiToolDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.aiToolsService.softDelete(id);
  }
}
