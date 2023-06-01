import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({
    example: 'iPhone',
    description: 'unique title',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'category description',
    description: 'category description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MinLength(5)
  description?: string;
}
