import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './Product';

@Entity({ name: 'product_variants' })
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float', nullable: true })
  discount?: number;

  @Column({ type: 'int' })
  count_left: number;

  @Column({ type: 'float', nullable: true })
  screen_size?: number;

  @Column({ type: 'text', nullable: true })
  processor?: string;

  @Column({ type: 'text', nullable: true })
  color?: string;

  @Column({ type: 'text', nullable: true })
  memory?: string;

  @Column({ type: 'text', nullable: true })
  ram?: string;

  @Column({ type: 'text', nullable: true })
  battery?: string;

  @Column({ type: 'text', nullable: true })
  camera?: string;

  @Column({ type: 'text', nullable: true })
  os?: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;
}
