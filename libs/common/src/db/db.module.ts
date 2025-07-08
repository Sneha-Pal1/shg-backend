import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SHG } from './entities/shg.entity';
import { VO } from './entities/vo.entity';
import { CLF } from './entities/clf.entity';
import { TRLMAdmin } from './entities/trlm-admin.entity';
import { DbService } from './db.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, SHG, VO, CLF, TRLMAdmin])],
  providers: [DbService],
  exports: [TypeOrmModule, DbService],
})
export class DbModule {}
