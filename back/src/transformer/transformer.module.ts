import { Module } from '@nestjs/common';
import { TransformerService } from './transformer.service';
import { TransformerController } from './transformer.controller';
import { CommonService } from 'src/common/common.service';
import { FileLoggerService } from 'src/logger/logger.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports : [LoggerModule],
  controllers: [TransformerController, ],
  providers: [TransformerService, CommonService],
})
export class TransformerModule {}
