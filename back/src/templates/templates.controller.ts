import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Res,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { TemplatesService } from './templates.service';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { Response } from 'express';
  
  
  @Controller('api/templates')
  export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
  
  
  @Post('upload')
  @UseInterceptors(
  FileInterceptor('file', {
  storage: diskStorage({
  destination: './templates',
  filename: (req, file, cb) => {
  const filename = `${uuidv4()}${extname(file.originalname)}`;
  cb(null, filename);
  },
  }),
  fileFilter: (req, file, cb) => {
  if (!file.originalname.match(/\.docx$/)) {
  return cb(new Error('Only .docx allowed'), false);
  }
  cb(null, true);
  },
  }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
  return { filename: file.filename, originalname: file.originalname };
  }
  
  
  @Get(':name')
  async download(@Res() res: Response, @Body('name') name: string) {
  // простая отдача файла, если нужно
  return this.templatesService.sendTemplate(res, name);
  }
  }