import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const docsConfig = new DocumentBuilder()
    .setTitle('SHG Backend API')
    .setDescription('API documentation for SHG Backend')
    .setVersion(process.env.npm_package_version || '0.0.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('api/docs', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
