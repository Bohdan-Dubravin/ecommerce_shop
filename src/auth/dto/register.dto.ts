import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Unique Email',
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'your password',
    description: 'password',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
