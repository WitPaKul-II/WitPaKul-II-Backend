import {  ProductActivitysController } from './productActivitys.controller';
import {ProductActivitysService} from './productActivitys.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { ProductImages } from '../entities/productImages.entity';
import { ProductActivitys } from '../entities/productActivitys.entity';
// import { Users } from './entity/users.entity';
// import { UserService } from './users.service';
// import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [TypeOrmModule.forFeature([ProductActivitys])],
  controllers: [ProductActivitysController],
  providers: [ProductActivitysService],
})
export class ProductActivitysModule {}
