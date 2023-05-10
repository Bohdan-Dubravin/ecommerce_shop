import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileUser } from './ProfileUser';
import { User } from './User';
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

  @Column('text', { array: true })
  imagesUrl?: string[];

  @ManyToMany(() => Category)
  @JoinTable({ name: 'category_products' })
  products: Category[];
}
