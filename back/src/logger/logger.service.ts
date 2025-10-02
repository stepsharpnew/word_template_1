import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerService implements LoggerService {
  private logFile = path.resolve(process.cwd(), 'logs.txt');

  log(message: any) {
    this.write('LOG', message);
  }

  error(message: any, trace?: string) {
    this.write('ERROR', `${message} ${trace ?? ''}`);
  }

  warn(message: any) {
    this.write('WARN', message);
  }

  debug(message: any) {
    this.write('DEBUG', message);
  }

  verbose(message: any) {
    this.write('VERBOSE', message);
  }

  private write(level: string, message: string) {
    try {
      const timestamp = new Date().toISOString();
      fs.appendFileSync(
        this.logFile,
        `[${timestamp}] [${level}] ${message}\n`,
        'utf8',
      );
    } catch (err) {
      // fallback на консоль, если не удалось записать
      console.error('Ошибка записи в лог:', err);
    }
  }
}
