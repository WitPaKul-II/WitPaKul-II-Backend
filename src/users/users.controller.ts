import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserEntity } from './users.entity';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UserService) { }

    @Get()
    async findAll(@Res() res: Response) {
        const response = await this.usersService.findAll()
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Get(":id")
    async findOne(@Param() id: number, @Res() res: Response) {
        const response = await this.usersService.findOne(id)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Post()
    async create(@Body() createUserDto: UserEntity, @Res() res: Response) {
        const response = await this.usersService.create(createUserDto)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Put(":id")
    async update(@Param() id: number, @Body() createUserDto: UserEntity, @Res() res: Response) {
        this.usersService.update(id, createUserDto)
        res.status(HttpStatus.OK).json({ message: "success" })
    }

    @Delete(":id")
    async delete(@Param() id: number, @Res() res: Response) {
        this.usersService.remove(id)
        res.status(HttpStatus.OK).json({ message: "success" })
    }
}