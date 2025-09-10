import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import createReport from 'docx-templates';

@Injectable()
export class TransformerService {
  // возвращаем Buffer, чтобы Express корректно отправил файл
  async generateLetter(dto: any): Promise<Buffer> {
    // Загружаем шаблон
    const template = fs.readFileSync('template_4396.docx');

    // Подставляем данные из DTO
    const result = await createReport({
      template,
      data: {
        contractNo: dto.contractNo,
        contractDate: dto.contractDate,
        title: dto.title,
        contractor: dto.contractor,
        outgoingNo: dto.outgoingNo,
        outgoingDate: dto.outgoingDate,
        // при необходимости добавляй другие поля dto...
      },
    });

    // createReport часто возвращает Uint8Array — конвертируем в Buffer
    return Buffer.from(result);
  }
}
