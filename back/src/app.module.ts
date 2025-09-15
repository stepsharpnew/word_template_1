import { Module } from '@nestjs/common';
import { TransformerModule } from './transformer/transformer.module';
import { CommonService } from './common/common.service';



@Module({
imports: [TransformerModule],
providers: [CommonService],
})
export class AppModule {}