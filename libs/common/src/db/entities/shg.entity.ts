import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VO } from './vo.entity';
import { CLF } from './clf.entity';

@Entity()
export class SHG {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  block: string;

  @Column()
  district: string;

  @ManyToOne(() => VO, (vo) => vo.shgs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'voId' })
  vo: VO;

  @Column()
  voId: string;

  @ManyToOne(() => CLF, (clf) => clf.shgs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clfId' })
  clf: CLF;

  @Column()
  clfId: string;
}
