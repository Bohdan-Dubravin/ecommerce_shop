import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../entities/User';

export class MangerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    if (Boolean(user.role === 'manager' || user.role === 'admin')) {
      throw new ForbiddenException('Manager right required!');
    }
    return true;
  }
}
