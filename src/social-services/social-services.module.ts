import { Module } from '@nestjs/common';
import { SocialServicesService } from './social-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { SocialService } from './entities/social-services.entity';
import { SocialServicesController } from './social-services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SocialService])],
  controllers: [SocialServicesController],
  providers: [IsExist, IsNotExist, SocialServicesService],
  exports: [SocialServicesService],
})
export class SocialServicesModule {}
