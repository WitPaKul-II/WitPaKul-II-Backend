import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res ,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import {Products} from './entities/products.entity'
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadservice } from 'src/upload/uploadservice';
 

// @Controller('products')
@Controller()
export class ProductController {
    constructor(private productService : ProductService ) { }


    // http://localhost:3000/findAll/product
    @Get("/findAll/product")
    async findAll(): Promise<Products[]> {
        return await this.productService.findAll();
    }
    // productcode
    @Get("/productcode/:productcode")
    async findOne(@Param("productcode") productcode: number): Promise<Products> {
        return await this.productService.findOne(productcode);
    }
    //images 
    // http://localhost:3000/images/
    @Post("/images")
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: uploadservice.destinationPath,
            filename: uploadservice.customFileName
        })
    }))
    uploadfile(@UploadedFiles() image ): string {
    return 'success OK ';
    }
    // http://localhost:3000/images/....path
    @Get("/images/:imagePath")
    async seeUploadFile(@Param('imagePath') image, @Res() res) {
        return res.sendFile(image, { root: './data/images/item'});
    }
    


    //  do it in midterm 
    @Post()
    async create(@Body() createUserDto: Products, @Res() res: Response) {
        const response = await this.productService.create(createUserDto)
        res.status(HttpStatus.OK).json({ payload: response })
    }

    @Put(":id")
    async update(@Param() id: number, @Body() createUserDto: Products, @Res() res: Response) {
        this.productService.update(id, createUserDto)
        res.status(HttpStatus.OK).json({ message: "success" })
    }

    @Delete(":id")
    async delete(@Param() id: number, @Res() res: Response) {
        this.productService.remove(id)
        res.status(HttpStatus.OK).json({ message: "success" })
    }
   
    
}