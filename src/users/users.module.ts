import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { ProfileUser } from 'src/entities/ProfileUser';

@Module({
  imports: [TypeOrmModule.forFeature([User, ProfileUser])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
