import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log('validate-authservice');
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async valadaterefreshToken(){
    
  }

  async login(user: any) {
    const Access_Token = await this.generateAccessToken(user);
    const Refresh_Token = await this.generateRefreshToken(user);
    return {
      access_token: Access_Token,
      refresh_token: Refresh_Token,
    };
  }

  async generateAccessToken(user: any): Promise<string>{
    const payloadAccessToken = {
      user_id: user.user_id,
      user_type: user.user_type,
    };

    const access_token = await this.jwtService.signAsync(payloadAccessToken, {
      expiresIn: jwtConstants.expiredateToken,
    });

    return access_token;
  }

  async generateRefreshToken(user: any): Promise<string>{
    const User = await this.userService.findOne(user.user_id);
    const payloadRefreshToken = {
      user_id: User.user_id,
      user_name: User.firstname + ' ' + User.lastname,
    };

    const refresh_token = await this.jwtService.signAsync(payloadRefreshToken, {
      expiresIn: jwtConstants.expiredateRefreshtoken,
    });
    return refresh_token;
  }
}
