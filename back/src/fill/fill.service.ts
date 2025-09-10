import { Injectable, NotFoundException } from '@nestjs/common';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';


@Injectable()
export class FillService {
templatesDir = join(process.cwd(), 'templates');


async fillTemplate(templateName: string, data: Record<string, any>): Promise<Buffer> {
const templatePath = join(this.templatesDir, templateName);
if (!existsSync(templatePath)) {
throw new NotFoundException('Template not found');
}


const content = readFileSync(templatePath, 'binary');
const zip = new PizZip(content);
const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });


doc.setData(data);


try {
doc.render();
} catch (error) {
// Для отладки можно логировать ошибки рендеринга
throw error;
}


const buf = doc.getZip().generate({ type: 'nodebuffer' });
return buf;
}
}