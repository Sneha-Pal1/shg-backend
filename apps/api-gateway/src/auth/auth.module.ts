import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CoreModule } from '@app/common/core';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '@app/common/types/auth';

@Module({
  imports: [
    CoreModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        useFactory: (_configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../auth.proto'),
            url: `localhost:${process.env.NODE_ENV === 'production' ? 'auth:5000' : 'localhost:5000'}`,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {}
