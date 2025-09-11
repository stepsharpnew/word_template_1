import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

@Injectable()
export class TransformerService {
  async generateLetter(dto: any): Promise<Buffer> {
    const tplPath = path.resolve(process.cwd(), '5073_Информирование_о_задержке_строительства_ИП_Корнеева.docx');
    const content = fs.readFileSync(tplPath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    const data = {
      contractNo: dto.contractNo ?? '',
      contractDate: dto.contractDate ?? '',
      title: dto.title ?? '',
      contractor: dto.contractor ?? '',
      outgoingNo: dto.outgoingNo ?? '',
      outgoingDate: dto.outgoingDate ?? '',
    };

    try {
      // НОВЫЙ способ — передаём объект прямо в render
      doc.render(data);
    } catch (err: any) {
      // подробный лог для дебага
      console.error('Docxtemplater render error', {
        message: err.message,
        properties: err.properties ? err.properties : undefined,
      });
      throw err;
    }

    return doc.getZip().generate({ type: 'nodebuffer' });
  }
}
