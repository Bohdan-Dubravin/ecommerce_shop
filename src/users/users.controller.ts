import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserProfileDto } from './dto/createuUserProfile.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
  @Auth()
  @Get()
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Patch(':id')
  updateUserById(@Param('id') userId: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(userId, userDto);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteUserById(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Post('profile/:id')
  createUserProfile(
    @Param('id') userId: string,
    @Body() userProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(userId, userProfileDto);
  }
}
