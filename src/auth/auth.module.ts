import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';

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
      signOptions: { expiresIn: jwtConstants.expiredateToken },
    }),
  ],
  providers: [AuthService, LocalStrategy ,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
