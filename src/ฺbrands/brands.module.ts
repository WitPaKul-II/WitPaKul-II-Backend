import { BrandsController } from './brands.controller';
import {BrandsService } from './brands.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Brands } from './entities/brands.entity';
// import { GraphQLModule } from '@nestjs/graphql'; 
@Module({
  imports: [TypeOrmModule.forFeature([Brands])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
