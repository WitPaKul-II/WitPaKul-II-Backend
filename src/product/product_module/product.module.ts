import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
// import { Users } from './entity/users.entity';
// import { UserService } from './users.service';
// import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
