import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(private usersService: UserService) { }

    //  after midterm crud UsersController
    @Get("findAll")
    async findAll(): Promise<Users[]> {
        return await this.usersService.findAll();
    }

}