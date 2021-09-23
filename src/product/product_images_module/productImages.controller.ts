import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductImages } from '../entities/productImages.entity';
import {Products} from '../entities/products.entity'
import { ProductImagesService } from './productImages.service';

@Controller('productImages')
export class ProductImagesController {
    constructor(private productImagesService : ProductImagesService ) { }

    @Get()
    async findAll(@Res() res: Response) {
        const response = await this.productImagesService.findAll()
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Get(":id")
    async findOne(@Param() id: number, @Res() res: Response) {
        const response = await this.productImagesService.findOne(id)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Post()
    async create(@Body() createUserDto: ProductImages, @Res() res: Response) {
        const response = await this.productImagesService.create(createUserDto)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Put(":id")
    async update(@Param() id: number, @Body() createUserDto: ProductImages, @Res() res: Response) {
        this.productImagesService.update(id, createUserDto)
        res.status(HttpStatus.OK).json({ message: "success" })
    }

    @Delete(":id")
    async delete(@Param() id: number, @Res() res: Response) {
        this.productImagesService.remove(id)
        res.status(HttpStatus.OK).json({ message: "success" })
    }
}
