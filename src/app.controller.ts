import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return "login successful";
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello2(@Request() req): string {
    return req.user;
  }
}
