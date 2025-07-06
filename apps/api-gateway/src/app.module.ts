import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (ConfigService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: ConfigService.get('AUTH_SERVICE_URL') || 'localhost:3003',
            package: 'auth',
            protoPath: join(__dirname, '../../../proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),

    CoreModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
