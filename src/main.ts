import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
   .setTitle('Dunas-House')
   .setDescription('Application to help realtors in the presentation and sale of houses')
   .setVersion('0.0.1 ALPHA')
   .addTag('status')
   .addTag('Auth')
   .addTag('Home')
   .addTag('User')
   .addTag('Profile')
   .addBearerAuth()
   .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
