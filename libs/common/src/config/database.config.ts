import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { User } from '../db/entities/user.entity';
import { SHG } from '../db/entities/shg.entity';
import { VO } from '../db/entities/vo.entity';
import { CLF } from '../db/entities/clf.entity';
import { TRLMAdmin } from '../db/entities/trlm-admin.entity';

export const databaseConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url:
      process.env.DATABASE_URL ||
      'postgres://postgres:postgres@localhost:5432/shg-db',
    entities: [User, SHG, VO, CLF, TRLMAdmin],
    synchronize: true,
    autoLoadEntities: true,
  }),
);
