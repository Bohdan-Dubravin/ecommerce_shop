import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  registerUser(@Body() dto: CreateUserDto) {}
}
