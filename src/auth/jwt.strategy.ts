import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/users/users.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'WitPaKul',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.user_id);
    return {
      user_id: user.user_id,
      name: user.firstname,
      email: user.email,
    };
  }
}
