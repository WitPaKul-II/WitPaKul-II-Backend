/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === password) {
        const {password,username, ...rest} = user;
      return rest;
    }
    return null;
  }
}
