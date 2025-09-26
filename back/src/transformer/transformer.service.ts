import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { CommonService } from 'src/common/common.service';
import reasons from './reasons';
import { FileLoggerService } from 'src/logger/logger.service';

@Injectable()
export class TransformerService {
  constructor(
    private commonService: CommonService,
    private readonly loggerService: FileLoggerService,
  ) {}

  async generateLetter(dto: any): Promise<Buffer> {
    const tplPath = path.resolve(
      process.cwd(),
      this.commonService.switchReasonsTemplate(dto.idTemplate),
    );
    this.loggerService.log(
      `Start generating letter for template: ${dto.contractNo}`,
    );
    const content = fs.readFileSync(tplPath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const data = {
      contractNo: dto.contractNo ?? '',
      contractDate: dto.contractDate ?? '',
      title: dto.title ?? '',
      contractor: dto.contractor ?? '',
      outgoingNo: dto.outgoingNo ?? '',
      outgoingDate: dto.outgoingDate ?? '',
      contractEnd: this.commonService.formatDate(dto.contractEnd) ?? '',
      res: dto.res,
      title_cleared: this.commonService.extractMainObject(dto.title),
      applicant: dto.applicant,
      ...this.commonService.containReason(dto.reasons, dto),
      ishod_number: this.commonService.outgoingDateNumber(dto.ishod_number),
    };

    try {
      doc.render(data);
      const bufferAfterFirst = doc.getZip().generate({ type: 'nodebuffer' });

      const zip2 = new PizZip(bufferAfterFirst);
      const doc2 = new Docxtemplater(zip2, {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc2.render(data);

      return doc2.getZip().generate({ type: 'nodebuffer' });
    } catch (err: any) {
      this.loggerService.error('Error while generating letter', err);
      console.error('Docxtemplater render error', {
        message: err.message,
        properties: err.properties ? err.properties : undefined,
      });
      throw err;
    }
  }

  async getReasons() {
    return reasons;
  }
}
