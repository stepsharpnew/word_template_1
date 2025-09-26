import { Module } from '@nestjs/common';
import { FileLoggerService } from './logger.service';

@Module({
  providers: [FileLoggerService],
  exports: [FileLoggerService], // чтобы использовать в других сервисах
})
export class LoggerModule {}
