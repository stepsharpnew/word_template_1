import { Module } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { LoggerModule } from 'src/logger/logger.module';
import { TransformerController } from './transformer.controller';
import { TransformerService } from './transformer.service';

@Module({
  imports: [LoggerModule],
  controllers: [TransformerController],
  providers: [TransformerService, CommonService],
})
export class TransformerModule {}
