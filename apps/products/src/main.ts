import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCT_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PRODUCT_PACKAGE_NAME,
        protoPath: join(__dirname, '../../../proto/product.proto'),
        url: `localhost:${process.env.PRODUCTS_PORT ?? 3002}`,
      },
    },
  );

  await app.listen();
  console.log('Products microservice is listening...');
}

bootstrap();
