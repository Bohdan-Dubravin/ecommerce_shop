import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  registerUser(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  @Get('login')
  @Auth()
  loginUser(@Body() dto: CreateUserDto) {
    return;
  }
}
