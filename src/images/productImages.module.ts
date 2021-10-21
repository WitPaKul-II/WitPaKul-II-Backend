import {  ProductImagesController } from './productImages.controller';
import { ProductImagesService} from './productImages.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from './entities/productImages.entity';
// import { Users } from './entity/users.entity';
// import { UserService } from './users.service';
// import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImages])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
