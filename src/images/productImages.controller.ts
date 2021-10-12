import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductImages } from './entities/productImages.entity';
import { ProductImagesService } from './productImages.service';

@Controller('productImages')
export class ProductImagesController {
    constructor(private productImagesService : ProductImagesService ) { }

    @Get("findAll")
    async findAll(): Promise<ProductImages[]> {
        return await this.productImagesService.findAll();
    }

}
