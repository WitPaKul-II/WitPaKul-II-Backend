import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Products } from './entities/products.entity'
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadservice } from 'src/upload/uploadservice';
import { CreateproductDto } from './dto/createproduct.dto';
import { CreateimageDto } from './dto/createimage.dto';
import { UpdateproductDto } from './dto/updateproduct.dto';
import { ColorsDto } from './dto/colors.dto';

// @Controller('products')
@Controller()
export class ProductController {
    constructor(private productService: ProductService) { }


    // http://localhost:3000/findAll/product
    @Get("findAll/product")
    async findAll(): Promise<Products[]> {
        return await this.productService.findAll();
    }
    // productcode
    @Get("productcode/:productcode")
    async findOne(@Param("productcode") productcode: number): Promise<Products> {
        return await this.productService.findOne(productcode);
    }
    //getimages
    // http://localhost:3000/images/....path
    @Get("images/:imagePath")
    async seeUploadFile(@Param('imagePath') image, @Res() res) {
        return res.sendFile(image, { root: './data/images/item' });
    }
    //uploadfile ได้
    //http://localhost:3000/images/
    
    @Post("images")
    @UseInterceptors(FileInterceptor('image', {
        
        storage: diskStorage({
            destination: uploadservice.destinationPath,
            filename: uploadservice.customFileName,   
        })
    }))
    
    uploadfile(@UploadedFiles() image): string {
        return "Seccess";
    }

        //ลองเอารูปกับproductรวมกัน แตก!!
    // @Post("images")
    // @UseInterceptors(FileInterceptor('image', {
    //     storage: diskStorage({
    //         destination: uploadservice.destinationPath,
    //         filename: uploadservice.customFileName
    //     })
    // }))
    // async addfile(@UploadedFiles() image , @Body() createimageDto: CreateimageDto){
    //   createimageDto.image_url = image.filename;

    //     // const data = this.productService.create(createproductDto);
    //     // return await this.productService.create(data, createproductDto.image_url);
    //     // return await this.productService.create(createimageDto);
    //     return 'success OK ';
    // }

    //  do it in midterm 
                                   
    @Post("addproductId")
    async create( @Body() createproductDto: CreateproductDto){
        return await this.productService.create(createproductDto);
    }

    @Put("edit/:editproductId")
    async updateproduct(
        @Param('editproductId') productcode: string, @Body() updateproductDto: UpdateproductDto){
            console.log(UpdateproductDto)
            return await this.productService.update(productcode, updateproductDto);
    }
    @Delete("delete/:deleteproductId")
    async deleteproduct(@Param('deleteproductId') productcode: string  ) {
        return await this.productService.remove(productcode);
    }

    // @Delete(":id")
    // async delete(@Param() id: number, @Res() res: Response) {
    //     this.productService.remove(id)
    //     res.status(HttpStatus.OK).json({ message: "success" })
    // }


}