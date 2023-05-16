import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/RefreshToken';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async registerUser(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);

    const tokens = await this.signTokens(user.id, user.email);
    await this.updateTokenInDb(user.id, tokens.refreshToken);
    delete user.password;

    return { ...user, ...tokens };
  }

  async login(dto: LoginDto) {
    const existUser = await this.userRepository.findOneBy({ email: dto.email });

    if (!existUser) {
      throw new ForbiddenException('Email or password is wrong');
    }

    // const passwordMatch = await argon.verify(existUser.password, dto.password);

    // if (!passwordMatch) {
    //   throw new ForbiddenException('Email or password is wrong');
    // }

    const tokens = await this.signTokens(existUser.id, existUser.email);

    await this.updateTokenInDb(existUser.id, tokens.refreshToken);
    delete existUser.password;
    return { ...tokens, ...existUser };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { refreshTokens: true },
    });
    console.log(user);

    if (!user) {
      throw new ForbiddenException('Access denied');
    }
    const tokenMatches = user.refreshTokens.some((token) => {
      return token.refreshToken === refreshToken;
    });

    if (!tokenMatches) {
      throw new ForbiddenException('Access denied');
    }

    await this.refreshTokenRepository.delete({ refreshToken });
    // await this.prisma.refreshToken.deleteMany({
    //   where: { refreshToken },
    // });

    const newTokens = await this.signTokens(user.id, user.email);
    await this.updateTokenInDb(user.id, newTokens.refreshToken);

    return newTokens;
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

  async updateTokenInDb(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      if (!user) {
        throw new NotFoundException('Users not found');
      }
    }

    const newRefToken = this.refreshTokenRepository.create({
      user,
      refreshToken,
    });

    await this.refreshTokenRepository.save(newRefToken);

    // await this.refreshTokenRepository.delete({ refreshToken });

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    // await this.prisma.refreshToken.deleteMany({
    //   where:  { createdAt: { lt: thirtyDaysAgo } },
    // });
    // const tokensToDelete = this.refreshTokenRepository
    //   .createQueryBuilder('e')
    //   .delete()
    //   .where('');

    // await this.prisma.refreshToken.deleteMany({
    //   where: { OR: [{ createdAt: { lt: thirtyDaysAgo }, refreshToken }] },
    // });
  }
}
