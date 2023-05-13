import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'cash' })
  payment_method: string;

  @Column({ type: 'float' })
  total: number;

  @Column({ default: 'waiting for payment' })
  payment_status: string;

  @CreateDateColumn()
  created_at: Date;
}
