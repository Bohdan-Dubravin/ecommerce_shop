import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './User';
import { OrderItem } from './OrderItem';
import { Payment } from './Payment';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Preparing your order' })
  status: string;

  @Column({ default: 'pick up' })
  delivery_method: string;

  @Column()
  delivery_address?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
