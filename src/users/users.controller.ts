import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';
import { CreateuserDto } from './dto/createuser.dto';
import { UpdateuserDto } from './dto/Updateuser.dto copy';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  //  after midterm crud UsersController
  @Get('findAll')
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @Get('userid/:userid')
  async findOne(@Param('userid') user_id: number): Promise<Users> {
    return await this.usersService.findOne(user_id);
  }

  @Post('adduser')
  async create(@Body() createuserDto: CreateuserDto) {
    return await this.usersService.create(createuserDto);
  }

  @Put('edit')
  async updateuser(@Body() updateuserDto: UpdateuserDto) {
    const user_id = updateuserDto.user_id;
    // console.log(updateproductDto);
    console.log(user_id);
    return await this.usersService.update(user_id, updateuserDto);
  }

  @Delete('delete/:deleteuserId')
  async deleteuser(@Param('deleteuserId') userid: number) {
    return await this.usersService.remove(userid);
  }
}
