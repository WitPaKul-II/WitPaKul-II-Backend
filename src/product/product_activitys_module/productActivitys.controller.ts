import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductActivitys } from '../entities/productActivitys.entity';
import { ProductActivitysService } from './productActivitys.service';

@Controller('productActivitys')
export class ProductActivitysController {
    constructor(private  productIActivitysService : ProductActivitysService ) { }

    @Get()
    async findAll(@Res() res: Response) {
        const response = await this. productIActivitysService.findAll()
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Get(":id")
    async findOne(@Param() id: number, @Res() res: Response) {
        const response = await this. productIActivitysService.findOne(id)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Post()
    async create(@Body() createUserDto: ProductActivitys, @Res() res: Response) {
        const response = await this. productIActivitysService.create(createUserDto)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Put(":id")
    async update(@Param() id: number, @Body() createUserDto: ProductActivitys, @Res() res: Response) {
        this. productIActivitysService.update(id, createUserDto)
        res.status(HttpStatus.OK).json({ message: "success" })
    }

    @Delete(":id")
    async delete(@Param() id: number, @Res() res: Response) {
        this. productIActivitysService.remove(id)
        res.status(HttpStatus.OK).json({ message: "success" })
    }
}
