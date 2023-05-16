import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RtStrategy } from './strategies/rt-strategy';
import { AtStrategy } from './strategies/at-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { RefreshToken } from '../entities/RefreshToken';

@Module({
  imports: [JwtModule.register({}), UsersModule,TypeOrmModule.forFeature([User, RefreshToken])],
  providers: [AuthService, RtStrategy, AtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
