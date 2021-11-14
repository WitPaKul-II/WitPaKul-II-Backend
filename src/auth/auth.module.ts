import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';
import { RefreshStrategy } from './strategy/refresh.strategy';

//Session Module
// @Module({
//   imports: [UsersModule, PassportModule.register({ session: true })],
//   providers: [AuthService, LocalStrategy, SessionSerializer],
// })

//Jwt Module
@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService, LocalStrategy ,JwtStrategy,RefreshStrategy],
  exports:[AuthService]
})
export class AuthModule {}
