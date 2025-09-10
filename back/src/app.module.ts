import { Module } from '@nestjs/common';
import { TransformerModule } from './transformer/transformer.module';



@Module({
imports: [TransformerModule],
})
export class AppModule {}