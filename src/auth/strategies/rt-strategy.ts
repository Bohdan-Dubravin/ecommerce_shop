import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('refreshToken'),
      secretOrKey: 'refresh',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.query.refreshToken;

    if (!refreshToken) throw new ForbiddenException('Refresh token expired');

    return {
      id: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
