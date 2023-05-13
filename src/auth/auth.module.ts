import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';

import { RtStrategy } from './strategies/rt-strategy';
import { AtStrategy } from './strategies/at-strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule, UsersModule],
  providers: [AuthService, RtStrategy, AtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
