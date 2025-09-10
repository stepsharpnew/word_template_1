import { Module } from '@nestjs/common';
import { FillController } from './fill.controller';
import { FillService } from './fill.service';
import { TemplatesModule } from '../templates/templates.module';


@Module({
imports: [TemplatesModule],
controllers: [FillController],
providers: [FillService],
})
export class FillModule {}