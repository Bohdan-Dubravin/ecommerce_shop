import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  @Expose()
  profile: Profile;

  @OneToMany(() => Event, (event) => event.organizer)
  @Expose()
  organized: Event[];

  @OneToMany(() => Attendee, (attendee) => attendee.user)
  attended: Attendee[];
}
