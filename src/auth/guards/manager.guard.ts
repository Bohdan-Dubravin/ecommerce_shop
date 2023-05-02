import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDocument } from '../../user/models/user.model';

export class MangerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserDocument }>();
    const user = request.user;

    if (Boolean(user.role === 'manager'))
      throw new ForbiddenException('Admin right required!');

    return true;
  }
}
