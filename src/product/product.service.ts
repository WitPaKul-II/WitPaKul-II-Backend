import { Inject, Injectable , NotFoundException ,HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Colors } from "src/colors/entities/colors.entity";
import { ProductImages } from "src/images/entities/productImages.entity";
import { Repository } from "typeorm";
import {Products} from './entities/products.entity'
import {ColorsService} from '../colors/colors.service'
import { UpdateproductDto } from "./dto/updateproduct.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,

    ) { }

    findAll(): Promise<Products[]> {
        return this.productRepository.find();
    }

    async findOne(productcode: number): Promise<Products> {
        const Products = await this.productRepository.findOne(productcode);
        if (!Products) {
            throw new NotFoundException(`productcode ${productcode} not found`);
        }
        return Products;}

        
    //  do it in midterm 
    create(product: Products): Promise<Products> {
        return this.productRepository.save(product);
    }
    // ProductImages
    creates(product: ProductImages): Promise<ProductImages> {
        return this.productRepository.save(product);
    }

    async update(productcode: string, product: UpdateproductDto) {
    
        const updatepro =  await this.productRepository.findOne(productcode)
        if (!updatepro) {
            throw new NotFoundException(`productcode not found`);
        }   
        // updatepro = Object.assign(updatepro,product)
        // //console.log(UpdateproductDto)
        // return this.productRepository.update(productcode, updatepro)
        //console.log(UpdateproductDto)
        return this.productRepository.save(product)
    }
                //remove
    // async remove(id: number): Promise<void> {
    //     await this.productRepository.delete(id);
    // }
    //    async remove(productcode: string , color:Colors  ) {
    //     const dd =  await this.productRepository.findOne(productcode)
    //     const dd2 =  await this.ColorsRepository.findOne(color)
    //     if (!dd) {
    //         throw new NotFoundException(`productcode not found`);
    //     }
    //     return this.productRepository.delete(productcode) ,this.ColorsRepository.delete(color);
    // }
    async remove(productcode: string   ) {
        const dd =  await this.productRepository.findOne(productcode)
        if (!dd) {
            throw new NotFoundException(`productcode not found`);
        }
        return this.productRepository.delete(productcode) ;
    }

    // async destroy(id: string, userId: string) {
    //     const comment = await this.commentRepository.findOne({
    //       where: { id },
    //       relations: ['author', 'idea'],
    //     });
    
    //     if (comment.author.id !== userId) {
    //       throw new HttpException(
    //         'You do not own this comment',
    //         HttpStatus.UNAUTHORIZED,
    //       );
    //     }
    
    //     await this.commentRepository.remove(comment);
    //     return this.toResponseObject(comment);
    //   }

    // public async deleteGame(gameId: number): Promise<DeleteGameOutput> {
    //     await this.gameRepository.findOneOrFail(gameId).catch(() => {
    //       throw new NotFoundException();
    //     });
    //     this.deleteImagesByGame(gameId);
    //     await this.gameRepository.delete(gameId).catch((err) => {
    //       throw new InternalServerErrorException();
    //     });
    //     return { gameId, status: 'success' };
    //   }
    // ทำต่อ
    // async remove(productcode: string   ) {
    //     let dd =  await this.productRepository.findOne(productcode)
    //     if (!dd) {
    //         throw new NotFoundException(`productcode not found`);
    //     }
    //      dd = Object.assign(dd,productcode)
    //     return this.productRepository.delete(productcode) ;
    // }


}
