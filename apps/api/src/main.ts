import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bync api')
    .setDescription('Bync internal api')
    .setVersion('1.0')
    .addTag('bync')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

(async () => {
  await bootstrap();
})();
