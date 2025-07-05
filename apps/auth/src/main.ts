import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../../../proto/auth.proto'),
        package: AUTH,
        url: `localhost:${process.env.AUTH_PORT ?? 3003}`,
      },
    },
  );
  await app.listen();
}
bootstrap();
