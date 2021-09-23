import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Colors } from './entities/colors.entity'
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController { 
    constructor(private colorsService : ColorsService ) { }

    @Get()
    async findAll(@Res() res: Response) {
        const response = await this.colorsService.findAll()
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Get(":id")
    async findOne(@Param() id: number, @Res() res: Response) {
        const response = await this.colorsService.findOne(id)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Post()
    async create(@Body() createUserDto: Colors, @Res() res: Response) {
        const response = await this.colorsService.create(createUserDto)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Put(":id")
    async update(@Param() id: number, @Body() createUserDto: Colors, @Res() res: Response) {
        this.colorsService.update(id, createUserDto)
        res.status(HttpStatus.OK).json({ message: "success" })
    }

    @Delete(":id")
    async delete(@Param() id: number, @Res() res: Response) {
        this.colorsService.remove(id)
        res.status(HttpStatus.OK).json({ message: "success" })
    }
}
