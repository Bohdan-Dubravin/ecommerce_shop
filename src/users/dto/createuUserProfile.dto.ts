import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';
export class CreateUserProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Min(16, { message: 'Min age 16' })
  @Max(102, { message: 'Max age 102' })
  age: number;
}
