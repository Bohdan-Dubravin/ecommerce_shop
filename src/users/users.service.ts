import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const isExist = this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (isExist) {
      throw new BadRequestException('Email already taken');
    }
    const newUser = this.userRepository.create({ ...dto });

    return this.userRepository.save(newUser);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async updateUser(userId: string, userDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.save({ ...updatedUser, ...userDto });
  }

  async deleteUser(userId: string) {
    const userToDelete = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.remove(userToDelete);
  }
}
