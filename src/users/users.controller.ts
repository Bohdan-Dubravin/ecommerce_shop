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
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAllUsers();
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
}
