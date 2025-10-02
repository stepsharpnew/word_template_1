import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FileLoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: FileLoggerService) {}

  private logFile = path.resolve(process.cwd(), 'logs.txt');

  // Читаем все строки лога
  private readLogs(): string[] {
    if (!fs.existsSync(this.logFile)) return [];
    const content = fs.readFileSync(this.logFile, 'utf8');
    return content.split('\n').filter((line) => line.trim().length > 0);
  }

  // Парсим дату из строки
  private parseLogDate(line: string): Date | null {
    const match = line.match(/^\[(.*?)\]/);
    if (!match) return null;
    return new Date(match[1]); // ISO-дата
  }

  @Get('today')
  getTodayLogs() {
    const logs = this.readLogs();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const todayLogs = logs.filter((line) => {
      const d = this.parseLogDate(line);
      return d && d.toISOString().startsWith(today);
    });
    return todayLogs;
  }

  @Get('count')
  getTotalCount() {
    const logs = this.readLogs();
    return { total: logs.length };
  }

  @Get('count/today')
  getTodayCount() {
    const logs = this.readLogs();
    const today = new Date().toISOString().slice(0, 10);
    const todayLogs = logs.filter((line) => {
      const d = this.parseLogDate(line);
      return d && d.toISOString().startsWith(today);
    });
    return { today: todayLogs.length };
  }
}
