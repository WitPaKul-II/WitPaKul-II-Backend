import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ColorsModule } from './colors/colors.module';
import { ProductImagesModule } from './images/productImages.module';
import { BrandsModule } from './ฺbrands/brands.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    //ENV for VM
    // host: 'WitPaKul_DB', 
    port: 3306,
    username: 'root',
    password: 'mysql',
    // password: 'witpakulbackend',
    database: 'WitPaKul_DB',
    entities: [
      'dist/**/entities/*{.ts,.js}',
    ],
    synchronize: false,
    
  }), UsersModule,ProductModule,ColorsModule,ProductImagesModule,BrandsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

