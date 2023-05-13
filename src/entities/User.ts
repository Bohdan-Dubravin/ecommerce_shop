import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileUser } from './ProfileUser';
import { Order } from './Order';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: 'user' })
  role: string;

  @OneToOne(() => ProfileUser)
  @JoinColumn()
  profile: ProfileUser;

  @OneToMany(() => Order, (post) => post.user)
  orders: Order[];
}
