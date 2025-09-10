import { Module } from '@nestjs/common';
import { TemplatesModule } from './templates/templates.module';
import { FillModule } from './fill/fill.module';


@Module({
imports: [TemplatesModule, FillModule],
})
export class AppModule {}