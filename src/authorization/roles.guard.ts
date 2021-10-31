import {
  CanActivate,
  ExecutionContext,
  Header,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Users } from '../users/entities/users.entity';
import { ROLES } from './ROLES';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from 'src/auth/constants';
import { UserService } from 'src/users/users.service';
import { request } from 'http';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const headerFieldValue = request.headerField;

    const jwt = request.headers.authorization.replace('Bearer ', '');
    console.log(jwt);
    const json = this.jwtService.decode(jwt, { json: true }) as Users;
    console.log(json);

    const user = request.user;
    if (!roles) return true;
    if (!user) return false;

    const userRole = user.user_type.type_name;

    if (userRole === ROLES.ADMIN) return true;
    const hasRole = () => roles.includes(userRole);

    return user && userRole && hasRole();
  }
}
