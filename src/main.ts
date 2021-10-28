import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //Session 
  // app.use(
  //   session({
  //     secret: 'WitPaKul2',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { magAge: 360000 },
  //   }),
  // );
  //   app.use(passport.initialize());
  //   app.use(passport.session());


  await app.listen(4000);
  app.enableCors();
}
bootstrap();
