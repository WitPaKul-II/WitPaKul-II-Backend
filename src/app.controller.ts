import { Controller, Get, Post, UseGuards,Request, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/guard/authenticated.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { UserService } from './users/users.service';
import { Users } from './users/entities/users.entity';
import { CreateuserDto } from './users/dto/createuser.dto';
import { RefreshGuard } from './auth/guard/refresh.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Request() req): any {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/register')
  async register(@Body() createuserDto: CreateuserDto) {
    return await this.userService.create(createuserDto),"Register Sucessfull";
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('/refresh_token')
  public async Refresh_token(@Request() req):Promise<any> {
    const access_token = await this.authService.generateAccessToken(req.user);
    return {
      access_token: access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async GetUser(@Request() req): Promise<any>{
    const user = await this.userService.findOne(req.user.user_id)
    console.log(user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  public getHello2(@Request() req): string {
    return req.user;
  }
  

}
