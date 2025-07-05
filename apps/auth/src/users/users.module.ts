import { DynamicModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({})
export class UsersModule {
  static register(): DynamicModule {
    return {
      module: UsersModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({}),
      ],
      controllers: [UsersController],
      providers: [UsersService],
      exports: [UsersService],
    };
  }
}
