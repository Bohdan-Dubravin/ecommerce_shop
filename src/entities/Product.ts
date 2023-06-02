import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './Category';
import { ProductVariant } from './ProductVariant';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ default: 'No brand' })
  brand?: string;

  @CreateDateColumn()
  created_at: Date;

  // @Column({ type: 'float' })
  // price: number;

  // @Column({ type: 'float' })
  // discount?: number;

  // @Column('text')
  // count_left?: number;

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants: ProductVariant[];

  @Column('text', { array: true })
  imagesUrl?: string[];

  @ManyToMany(() => Category)
  @JoinTable({ name: 'category_products' })
  category: Category[];
}
