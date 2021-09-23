import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import {Products} from './entities/products.entity'
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService : ProductService ) { }

    @Get()
    async findAll(@Res() res: Response) {
        const response = await this.productService.findAll()
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Get(":id")
    async findOne(@Param() id: number, @Res() res: Response) {
        const response = await this.productService.findOne(id)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Post()
    async create(@Body() createUserDto: Products, @Res() res: Response) {
        const response = await this.productService.create(createUserDto)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Put(":id")
    async update(@Param() id: number, @Body() createUserDto: Products, @Res() res: Response) {
        this.productService.update(id, createUserDto)
        res.status(HttpStatus.OK).json({ message: "success" })
    }

    @Delete(":id")
    async delete(@Param() id: number, @Res() res: Response) {
        this.productService.remove(id)
        res.status(HttpStatus.OK).json({ message: "success" })
    }
}
