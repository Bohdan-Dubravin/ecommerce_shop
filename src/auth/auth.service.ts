import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
  }
}
