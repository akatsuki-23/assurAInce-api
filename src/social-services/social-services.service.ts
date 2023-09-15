import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateSocialServiceDto } from './dto/create-social-services.dto';
import { SocialService } from './entities/social-services.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class SocialServicesService {
  constructor(
    @InjectRepository(SocialService)
    private socialServicesRepository: Repository<SocialService>,
  ) {}

  create(
    createSocialServiceDto: CreateSocialServiceDto,
  ): Promise<SocialService> {
    return this.socialServicesRepository.save(
      this.socialServicesRepository.create(createSocialServiceDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<SocialService[]> {
    return this.socialServicesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(
    fields: EntityCondition<SocialService>,
  ): Promise<NullableType<SocialService>> {
    return this.socialServicesRepository.findOne({
      where: fields,
    });
  }

  update(
    id: SocialService['id'],
    payload: DeepPartial<SocialService>,
  ): Promise<SocialService> {
    return this.socialServicesRepository.save(
      this.socialServicesRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: SocialService['id']): Promise<void> {
    await this.socialServicesRepository.softDelete(id);
  }
}
