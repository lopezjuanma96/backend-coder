import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Cats Example')
  .setDescription('Cats APi with Nest')
  .setVersion('1.0.0')
  .addTag('cats')
  .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/docs', app, document)

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
