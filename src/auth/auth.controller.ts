import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { GetCurrentUser } from './decorators';
import { RtGuard } from './guards';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/credentials.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'register new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @Post('register')
  registerUser(@Body() dto: RegisterDto) {
    return this.authService.registerUser(dto);
  }

  @ApiOperation({ summary: 'login with credentials' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @HttpCode(200)
  @Post('login')
  loginUser(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'get new tokens pair' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @HttpCode(200)
  @Post('refreshTokens')
  @UseGuards(RtGuard)
  refreshTokens(
    @GetCurrentUser() user: { id: string; email: string; refreshToken: string },
  ) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @ApiOperation({ summary: 'get new tokens pair' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @HttpCode(200)
  @Post('logout')
  @Auth()
  logout(@GetCurrentUser() user: { id: string; refreshToken: string }) {
    return this.authService.logout(user.id, user.refreshToken);
  }
}
