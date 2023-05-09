import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserProfileDto } from './dto/createuUserProfile.dto';
import { ProfileUser } from 'src/entities/ProfileUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ProfileUser)
    private profileUserRepository: Repository<ProfileUser>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const isExist = await this.userRepository.findOneBy({
      email: dto.email,
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
    const updatedUser = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.save({ ...updatedUser, ...userDto });
  }

  async deleteUser(userId: string) {
    const userToDelete = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.remove(userToDelete);
  }

  async createUserProfile(userId: string, dto: CreateUserProfileDto) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newProfile = this.profileUserRepository.create({ ...dto });

    const savedProfile = await this.userRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }
}
