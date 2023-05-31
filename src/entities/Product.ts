import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './Category';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  discount?: number;

  @Column()
  size?: string;

  @Column({ default: 'No brand' })
  brand?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('text', { array: true })
  imagesUrl?: string[];

  @Column('text')
  count_left?: number;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'category_products' })
  products: Category[];
}
