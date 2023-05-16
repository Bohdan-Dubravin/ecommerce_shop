import { ApiProperty } from '@nestjs/swagger';
export class AuthResponseDto {
  @ApiProperty({
    description: 'user id',
    nullable: false,
  })
  id: string;

  @ApiProperty({
    description: 'Unique Email',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    description: 'user role',
    nullable: false,
    default: 'user',
  })
  role: string;

  @ApiProperty({
    description: 'date created',
    nullable: false,
  })
  created_at: string;

  @ApiProperty({
    description: 'accessToken',
    nullable: false,
  })
  accessToken: string;

  @ApiProperty({
    description: 'refreshToken',
    nullable: false,
  })
  refreshToken: string;
}
