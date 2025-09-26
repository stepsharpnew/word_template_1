import { Controller } from '@nestjs/common';
import { FileLoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: FileLoggerService) {}
}
