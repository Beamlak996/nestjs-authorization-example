import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AccountStatus } from '../enums/user.enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ default: AccountStatus.Inactive })
  accountStatus: AccountStatus;
}
