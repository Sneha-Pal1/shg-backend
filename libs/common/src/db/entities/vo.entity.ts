import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CLF } from './clf.entity';
import { SHG } from './shg.entity';

@Entity()
export class VO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToOne(() => CLF, (clf) => clf.vos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clfId' })
  clf: CLF;

  @Column()
  clfId: string;

  @OneToMany(() => SHG, (shg) => shg.vo)
  shgs: SHG[];
}
