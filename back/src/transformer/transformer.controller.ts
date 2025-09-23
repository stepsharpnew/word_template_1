import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TransformerService } from './transformer.service';
import * as DTO from './dto/main.dto'; // namespace import — решает проблему декораторов
import * as express from 'express';

@Controller('transformer')
export class TransformerController {
  constructor(private readonly transformerService: TransformerService) {}

  // Используем POST чтобы тело запроса можно было передать корректно
  @Post('letter')
  async getLetter(@Res() res: express.Response, @Body() dto: DTO.ExcelRowDTO) {
    const buffer = await this.transformerService.generateLetter(dto);

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=letter.docx'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.send(buffer);
  }

  @Get('reasons')
  async getTry(){
    return this.transformerService.getReasons()
  }
}
