import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';
import { Request } from 'express';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      
    });
  }
  async validate(payload: any) {
    console.log("Test"+payload);
    const user = await this.authService.ValidateRefreshToken(payload);
    console.log(user);
    
    return {
      user_id: user.user_id,
    };
  }
}
