import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '@app/common/types/auth';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        useFactory: (ConfigService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: `${process.env.NODE_ENV === 'production' ? 'auth:5000' : 'localhost:5000'}`,
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
