import { Module } from '@nestjs/common';
import { AiToolsService } from './ai-tools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { AiTools } from './entities/ai-tools.entity';
import { AiToolsController } from './ai-tools.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AiTools])],
  controllers: [AiToolsController],
  providers: [IsExist, IsNotExist, AiToolsService],
  exports: [AiToolsService],
})
export class AiToolsModule {}
