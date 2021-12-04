import { BrandsController } from './brands.controller';
import {BrandsService } from './brands.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Brands } from './entities/brands.entity';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';
// import { GraphQLModule } from '@nestjs/graphql'; 
@Module({
  imports: [TypeOrmModule.forFeature([Brands]),forwardRef(() => ProductModule),forwardRef(() => AuthModule)],
  controllers: [BrandsController],
  providers: [BrandsService,],

})
export class BrandsModule {}
