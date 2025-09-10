import { Controller, Post, Body, Res, BadRequestException } from '@nestjs/common';
import { FillService } from './fill.service';
import { FillDto } from './dto/fill.dto';
import { Response } from 'express';


@Controller('api/fill')
export class FillController {
constructor(private readonly fillService: FillService) {}


@Post()
async fill(@Body() body: FillDto, @Res() res: Response) {
if (!body || !body.template || !body.data) {
throw new BadRequestException('template and data are required');
}


const buffer = await this.fillService.fillTemplate(body.template, body.data);


res.set({
'Content-Type':
'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
'Content-Disposition': `attachment; filename="filled-${body.template}"`,
});
res.send(buffer);
}
}