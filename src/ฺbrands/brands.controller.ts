import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Brands } from './entities/brands.entity'
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) { }


    @Get("findAll")
    async findAll(): Promise<Brands[]> {
        return await this.brandsService.findAll();
    }
    @Get("/:brands")
    async findOne(@Param("brands") brands: number): Promise<Brands> {
        return await this.brandsService.findOne(brands);
    }
   
}
