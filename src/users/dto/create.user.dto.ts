import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 16, { message: 'Password length must be 5-16 characters' })
  password: string;

  @IsOptional()
  refreshToken?: string[];
}
