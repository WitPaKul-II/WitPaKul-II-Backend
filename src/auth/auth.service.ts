/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log("validate-authservice");
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      user_id: user.user_id,
      name: user.firstname,
      email: user.email,
      user_type: user.user_type,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
