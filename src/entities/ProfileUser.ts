import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userProfiles' })
export class ProfileUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
