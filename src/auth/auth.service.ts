import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
}
