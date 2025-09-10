import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';


@Injectable()
export class TemplatesService {
templatesDir = join(process.cwd(), 'templates');


async sendTemplate(res: Response, name: string) {
const filePath = join(this.templatesDir, name);
if (!existsSync(filePath)) {
res.status(404).send({ message: 'Template not found' });
return;
}
res.download(filePath);
}
}