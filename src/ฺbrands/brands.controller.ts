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
import { Brands } from './entities/brands.entity';
import { BrandsService } from './brands.service';
import { createBrandsDto } from './dto/createbrands.dto';
import { UpdateBrandsDto } from './dto/updatebrands.dto';
import { ProductService } from 'src/product/product.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { ROLES } from 'src/authorization/ROLES';
import { Roles } from 'src/authorization/roles.decorator';

@Controller('brands')
export class BrandsController {
  constructor(
    private brandsService: BrandsService,
    private productService: ProductService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Get('findAll')
  async findAll(): Promise<Brands[]> {
    return await this.brandsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Get('/:brands')
  async findOne(@Param('brands') brands: number): Promise<Brands> {
    return await this.brandsService.findOne(brands);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Post('addbrand')
  async create(@Body() createbrands: createBrandsDto) {
    try {
      await this.brandsService.findOneByQuery({
        where: [
          { brand_id: `${createbrands.brand_id}` },
          { brand_name: `${createbrands.brand_name}` },
        ],
      });
    } catch (NotFoundException) {
      return await this.brandsService.create(createbrands);
    }
    throw new NotAcceptableException('Some information already existed');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Put('edit')
  async updateuser(@Body() updatebrandDto: UpdateBrandsDto) {
    let brand_id = updatebrandDto.brand_id;
    try {
      await this.brandsService.findOneByQuery({
        where: [
          { brand_id: `${brand_id}` },
          { brand_name: `${updatebrandDto.brand_name}` },
        ],
      });
    } catch (NotFoundException) {
      return await this.brandsService.update(brand_id, updatebrandDto);
    }
    throw new NotAcceptableException('Some information already existed');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Delete('delete/:deleteubrand_id')
  async deleteuser(@Param('deleteubrand_id') brand_id: number) {
    let product = [];
    try {
      product = [
        await this.productService.findOneByQuery({
          where: { brand: `${brand_id}` },
        }),
      ];
    } catch (NotFoundException) {
      return await this.brandsService.remove(brand_id), 'Delete Sucessful';
    }

    for (let index = 0; index < product.length; index++) {
      console.log(
        `${product[index].product_code} : ${product[index].brand.brand_id} : ${product[index].brand.brand_name}`,
      );
    }

    if (product[0] != null) {
      throw new NotAcceptableException(
        "Can't Delete this Brand, There are some product use this brand",
      );
    }
  }
}
