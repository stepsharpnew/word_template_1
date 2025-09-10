import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
const app = await NestFactory.create(AppModule);


// CORS на весь мир (можно ограничить доменами)
app.enableCors();


const config = new DocumentBuilder()
.setTitle('Word Template Filler API')
.setDescription('API для заполнения .docx шаблонов данными из фронта')
.setVersion('1.0')
.build();


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/docs', app, document);


await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
console.log('Listening on', await app.getUrl());
}
bootstrap();