import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SHG } from './entities/shg.entity';
import { VO } from './entities/vo.entity';
import { CLF } from './entities/clf.entity';
import { TRLMAdmin } from './entities/trlm-admin.entity';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(User)
    public readonly userRepo: Repository<User>,

    @InjectRepository(SHG)
    public readonly shgRepo: Repository<SHG>,

    @InjectRepository(VO)
    public readonly voRepo: Repository<VO>,

    @InjectRepository(CLF)
    public readonly clfRepo: Repository<CLF>,

    @InjectRepository(TRLMAdmin)
    public readonly trlmRepo: Repository<TRLMAdmin>,
  ) {}
}
