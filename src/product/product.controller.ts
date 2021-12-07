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
} from '@nestjs/common';
import { EntitySchema } from 'typeorm';
import { Response } from 'express';
import { Products } from './entities/products.entity';
import { ProductService } from './product.service';
import { ProductImagesService } from '../images/productImages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadservice } from 'src/upload/uploadservice';
import { CreateproductDto } from './dto/createproduct.dto';
import { CreateimageDto } from './dto/createimage.dto';
import { UpdateproductDto } from './dto/updateproduct.dto';
import { ColorsDto } from './dto/colors.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { ROLES } from 'src/authorization/ROLES';

@Controller()
export class ProductController {
  constructor(
    private productService: ProductService,
    private productImagesService: ProductImagesService,
    private authService: AuthService,
  ) {}

  // http://localhost:3000/findAll/product
  @Get('findAll/product')
  async findAll(): Promise<Products[]> {
    return await this.productService.findAll();
  }

  // productcode
  @Get('productcode/:productcode')
  async findOne(@Param('productcode') productcode: number): Promise<Products> {
    
    // this.authService.checkUserRole();

    return await this.productService.findOne(productcode);
  }

  // http://localhost:3000/images/....path
  @Get('images/:imagePath')
  async seeUploadFile(@Param('imagePath') image, @Res() res) {
    return res.sendFile(image, { root: './data/images/item' });
  }

  //http://localhost:3000/images/
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Post('images')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: uploadservice.destinationProductPath,
        filename: uploadservice.customFileName,
      }),
    }),
  )
  async uploadfile(@UploadedFiles() image, @Headers() headers) {
    console.log(`product_code: ${headers.product_code}, image_url: ${headers.filename},`);
    let text = headers.filename;
    let Arreyproduct = text.split("-",1);
    let product_code_fromHeader = Arreyproduct[0].toString();
    console.log(product_code_fromHeader);
    
    await this.productImagesService.create({
      product_code: product_code_fromHeader,
      image_url: headers.filename,
    });
    
    
    return await image;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Post('addproductId')
  async create(@Body() createproductDto: CreateproductDto) {
    return await this.productService.create(createproductDto);
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Put('edit')
  async updateproduct(@Body() updateproductDto: UpdateproductDto) {
    const productcode = updateproductDto.product_code;
    // console.log(updateproductDto);
    console.log(productcode);
    return await this.productService.update(productcode, updateproductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  @Delete('delete/:deleteproductId')
  async deleteproduct(@Param('deleteproductId') productcode: string) {
    return await this.productService.remove(productcode);
  }
}
