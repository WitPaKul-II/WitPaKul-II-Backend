import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotAcceptableException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Colors } from './entities/colors.entity';
import { ColorsService } from './colors.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { ROLES } from 'src/authorization/ROLES';
import { CreateColorsDto } from './dto/createcolor.dto';
import { UpdateColorsDto } from './dto/updatecolor.dto';

@Controller('colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Get('findAll')
  async findAll(): Promise<Colors[]> {
    return await this.colorsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Get('/:colors')
  async findOne(@Param('colors') colors: number): Promise<Colors> {
    return await this.colorsService.findOne(colors);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Post('/addcolors')
  async create(@Body() createColors: CreateColorsDto) {
    try {
      await this.colorsService.findOneByQuery({
        where: [
          { color_code: `${createColors.color_code}` },
          { color_name: `${createColors.color_name}` },
        ],
      });
    } catch (NotFoundException) {
      return await this.colorsService.create(createColors);
    }
    throw new NotAcceptableException('Some information already existed');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Put('/edit')
  async updateuser(@Body() updatebrandDto: UpdateColorsDto) {
    let color_id = updatebrandDto.color_id;
    try {
      await this.colorsService.findOneByQuery({
        where: [
          { color_code: `${updatebrandDto.color_code}` },
          { color_name: `${updatebrandDto.color_name}` },
        ],
      });
    } catch (NotFoundException) {
      return await this.colorsService.update(color_id, updatebrandDto);
    }

    throw new NotAcceptableException('Some information already existed');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Delete('delete/:deletecolorId')
  async deleteuser(@Param('deletecolorId') color_id: number) {
    return await this.colorsService.remove(color_id);
  }
}
