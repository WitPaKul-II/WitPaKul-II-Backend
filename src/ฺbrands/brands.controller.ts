import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Brands } from './entities/brands.entity'
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController { 
    constructor(private brandsService : BrandsService ) { }

    @Get()
    async findAll(@Res() res: Response) {
        const response = await this.brandsService.findAll()
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Get(":id")
    async findOne(@Param() id: number, @Res() res: Response) {
        const response = await this.brandsService.findOne(id)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Post()
    async create(@Body() createUserDto: Brands, @Res() res: Response) {
        const response = await this.brandsService.create(createUserDto)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Put(":id")
    async update(@Param() id: number, @Body() createUserDto: Brands, @Res() res: Response) {
        this.brandsService.update(id, createUserDto)
        res.status(HttpStatus.OK).json({ message: "success" })
    }

    @Delete(":id")
    async delete(@Param() id: number, @Res() res: Response) {
        this.brandsService.remove(id)
        res.status(HttpStatus.OK).json({ message: "success" })
    }
}
