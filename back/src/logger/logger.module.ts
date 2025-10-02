import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { FileLoggerService } from './logger.service';

@Module({
  providers: [FileLoggerService],
  controllers: [LoggerController],
  exports: [FileLoggerService], // чтобы использовать в других сервисах
})
export class LoggerModule {}
