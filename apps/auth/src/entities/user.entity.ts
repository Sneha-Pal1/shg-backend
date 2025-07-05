import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phoneNumber: number;

  @Column()
  password: string;

  @Column()
  designation: 'president' | 'member' | 'secretary' | 'treasurer';

  @Column()
  fatherOrHusbandName: string;

  @Column()
  category: 'ST' | 'SC' | 'OBC' | 'General' | 'Other';

  @Column()
  disability: boolean;

  @Column()
  religion: 'Hindu' | 'Muslim' | 'Tribes' | 'Christian' | 'Other';

  @Column()
  gender: 'Male' | 'Female' | 'Other';

  @Column()
  accountAvailable: boolean;
}
