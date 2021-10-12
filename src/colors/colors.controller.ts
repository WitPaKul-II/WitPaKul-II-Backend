import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Colors } from './entities/colors.entity'
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController { 
    constructor(private colorsService : ColorsService ) { }

    @Get("findAll")
    async findAll(): Promise<Colors[]> {
        return await this.colorsService.findAll();
    }
    @Get("/:colors")
    async findOne(@Param("colors") colors: number): Promise<Colors> {
        return await this.colorsService.findOne(colors);
    }

  
}
