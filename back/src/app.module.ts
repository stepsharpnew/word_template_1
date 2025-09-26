import { Module } from '@nestjs/common';
import { TransformerModule } from './transformer/transformer.module';
import { CommonService } from './common/common.service';
import { LoggerModule } from './logger/logger.module';



@Module({
imports: [TransformerModule, LoggerModule],
providers: [CommonService],
})
export class AppModule {}