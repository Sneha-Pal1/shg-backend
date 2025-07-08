import { Module } from '@nestjs/common';
import { CoreModule } from '@app/common/core';
import { DbModule } from '@app/common/db';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [CoreModule, DbModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AuthModule {}
