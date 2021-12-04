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
  NotAcceptableException,
} from '@nestjs/common';
import { Response } from 'express';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';
import { CreateuserDto } from './dto/createuser.dto';
import { UpdateuserDto } from './dto/updateuser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadservice } from 'src/upload/uploadservice';
import { diskStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { ROLES } from 'src/authorization/ROLES';
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}
   
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Get('findAll')
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Get('userid/:userid')
  async findOne(@Param('userid') user_id: number): Promise<Users> {
    return await this.usersService.findOne(user_id);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string): Promise<Users> {
    return await this.usersService.findOneByUsername(username);
  }

  @Post('adduser')
  async create(@Body() createuserDto: CreateuserDto) {
    try {
      await this.usersService.findOneByQuery({
        where: [
          { username: `${createuserDto.username}` },
          { password: `${createuserDto.password}` },
        ],
      });
    } catch (NotFoundException) {
      return await this.usersService.create(createuserDto)," Sucessful";
    }
    throw new NotAcceptableException('Some information is invalide');
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

  @Get('images/:imagePath')
  async seeUploadFile(@Param('imagePath') image, @Res() res) {
    return res.sendFile(image, { root: './data/images/users' });
  }

  @UseGuards(JwtAuthGuard)
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
