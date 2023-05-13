import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './Order';
import { Product } from './Product';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', default: 1 })
  quantity: number;

  @Column({ unique: true })
  title: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
