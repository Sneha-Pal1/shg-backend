import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.AUTH_DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule.register(),
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class AuthModule {}
