import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TRLMLevel } from '../enums/trlm-level.enum';

@Entity()
export class TRLMAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: TRLMLevel })
  level: TRLMLevel;

  @Column()
  location: string;

  //   @OneToMany(() => CLF, (clf) => clf.trlm)
  //   clfs: CLF[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
