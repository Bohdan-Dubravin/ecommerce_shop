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

    const tokens = await this.signTokens(user.id, user.email);
    delete user.password;

    return { ...user, ...tokens };
  }

  async signTokens(
    userId: string,
    email: string, // : Promise<Tokens>
  ) {
    const accessToken = this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '5m', secret: 'dsffdfww' },
    );

    const refreshToken = this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '30d', secret: 'refresh' },
    );
    const [at, rt] = await Promise.all([accessToken, refreshToken]);
    return { accessToken: at, refreshToken: rt };
  }
}
