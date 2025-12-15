import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Biro Perjalanan Mlaku-Mlaku API')
    .setDescription('RESTful API documentation for Travel Agency Management System')
    .setVersion('1.0')
    .addTag('auth', 'Authentication & Authorization endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('travel-spots', 'Travel destination management')
    .addTag('travel-packages', 'Travel package management')
    .addTag('travel-trips', 'Trip booking and management')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
