import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
<<<<<<< src/main.ts
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(4000);
  app.enableCors();
=======
  const app = await NestFactory.create(AppModule , { cors: true });
  await app.listen(4000);
  
  
>>>>>>> src/main.ts
}
bootstrap();
