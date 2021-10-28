import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

//Session Module
// @Module({
//   imports: [UsersModule, PassportModule.register({ session: true })],
//   providers: [AuthService, LocalStrategy, SessionSerializer],
// })

//Jwt Module
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'WitPaKul',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
