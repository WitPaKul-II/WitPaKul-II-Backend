import { Controller, Get, Post, UseGuards,Request, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/guard/authenticated.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { UserService } from './users/users.service';
import { Users } from './users/entities/users.entity';
import { CreateuserDto } from './users/dto/createuser.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/register')
  async register(@Body() createuserDto: CreateuserDto) {
    return await this.userService.create(createuserDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello2(@Request() req): string {
    return req.user;
  }
  

}
