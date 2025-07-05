import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
