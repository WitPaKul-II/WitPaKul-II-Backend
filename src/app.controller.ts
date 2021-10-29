import { Controller, Get, Post, UseGuards,Request, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  // @Post('/logout')
  // async logout(@Res({ passthrough: true }) res: Response): Promise<boolean> {
  //   res.clearCookie('jwt');
  //   return true;
  // }
    
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello2(@Request() req): string {
    return req.user;
  }
  

}
