import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user_module/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity';
import { UsersCategory } from './users/entities/usersCategory.entity';
import { ProductModule } from './product/product_module/product.module';
import { Products } from './product/entities/products.entity';
import { Brands } from './product/entities/brands.entity';
import { Colors } from './product/entities/colors.entity';
import { ProductImages } from './product/entities/productImages.entity';
import { ProductActivitys } from './product/entities/productActivitys.entity';
import { ColorsModule } from './product/colors_module/colors.module';
import { ProductImagesModule } from './product/product_images_module/productImages.module';
import { ProductActivitysModule } from './product/product_activitys_module/productActivitys.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mysql',
    database: 'witpakul_db',
    entities: [
      'dist/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    
  }), UsersModule,ProductModule,ColorsModule,ProductImagesModule,ProductActivitysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

