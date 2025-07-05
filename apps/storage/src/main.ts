import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FILE_STORAGE_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StorageModule,
    {
      transport: Transport.GRPC,
      options: {
        package: FILE_STORAGE_PACKAGE_NAME,
        protoPath: join(__dirname, '../../../proto/file_storage.proto'),
        url: `localhost:${process.env.STORAGE_PORT ?? 3005}`,
      },
    },
  );

  await app.listen();
  console.log('File storage microservice is listening...');
}
bootstrap();
