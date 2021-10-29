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
  UploadedFiles,
  UseInterceptors,
  Headers,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';
import { CreateuserDto } from './dto/createuser.dto';
import { UpdateuserDto } from './dto/Updateuser.dto copy';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadservice } from 'src/upload/uploadservice';
import { diskStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}

  @Get('findAll')
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('userid/:userid')
  async findOne(@Param('userid') user_id: number): Promise<Users> {
    return await this.usersService.findOne(user_id);
  }

  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string): Promise<Users> {
    return await this.usersService.findOneByUsername(username);
  }

  @Post('adduser')
  async create(@Body() createuserDto: CreateuserDto) {
    return await this.usersService.create(createuserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit')
  async updateuser(@Body() updateuserDto: UpdateuserDto) {
    const user_id = updateuserDto.user_id;
    console.log(user_id);
    return await this.usersService.update(user_id, updateuserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:deleteuserId')
  async deleteuser(@Param('deleteuserId') userid: number) {
    return await this.usersService.remove(userid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('images/:imagePath')
  async seeUploadFile(@Param('imagePath') image, @Res() res) {
    return res.sendFile(image, { root: './data/images/users' });
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: uploadservice.destinationUserPath,
        filename: uploadservice.customFileName,
      }),
    }),
  )
  async uploadfile(@UploadedFiles() image, @Headers() headers) {
    return await image;
  }
}
