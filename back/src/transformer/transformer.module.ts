import { Module } from '@nestjs/common';
import { TransformerService } from './transformer.service';
import { TransformerController } from './transformer.controller';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [TransformerController],
  providers: [TransformerService, CommonService],
})
export class TransformerModule {}
