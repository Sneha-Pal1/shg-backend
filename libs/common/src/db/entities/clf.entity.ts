import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VO } from './vo.entity';
import { SHG } from './shg.entity';

@Entity()
export class CLF {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  //   @ManyToOne(() => TRLMAdmin, (trlm) => trlm.clfs, { onDelete: 'SET NULL' })
  //   @JoinColumn({ name: 'trlmId' })
  //   trlm: TRLMAdmin;@ManyToOne(() => TRLMAdmin, (trlm) => trlm.clfs, { onDelete: 'SET NULL' })
  //   @JoinColumn({ name: 'trlmId' })
  //   trlm: TRLMAdmin;

  @Column({ nullable: true })
  trlmId: string;

  @OneToMany(() => VO, (vo) => vo.clf)
  vos: VO[];

  @OneToMany(() => SHG, (shg) => shg.clf)
  shgs: SHG[];
}
