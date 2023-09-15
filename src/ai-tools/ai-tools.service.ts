import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, In, Repository } from 'typeorm';
import { CreateAiToolDto } from './dto/create-ai-tool.dto';
import { AiTools } from './entities/ai-tools.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class AiToolsService {
  constructor(
    @InjectRepository(AiTools)
    private aiToolsRepository: Repository<AiTools>,
  ) { }

  create(createAiToolDto: CreateAiToolDto): Promise<AiTools> {
    return this.aiToolsRepository.save(
      this.aiToolsRepository.create(createAiToolDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<AiTools[]> {
    return this.aiToolsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<AiTools>): Promise<NullableType<AiTools>> {
    return this.aiToolsRepository.findOne({
      where: fields,
    });
  }

  update(id: AiTools['id'], payload: DeepPartial<AiTools>): Promise<AiTools> {
    return this.aiToolsRepository.save(
      this.aiToolsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: AiTools['id']): Promise<void> {
    await this.aiToolsRepository.softDelete(id);
  }

  async findByIds(ids: number[]): Promise<AiTools[]> {
    return this.aiToolsRepository.findBy({ id: In(ids) });
  }
}
