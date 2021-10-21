import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {ProductImages} from './entities/productImages.entity'
@Injectable()
export class ProductImagesService {
    constructor(
        @InjectRepository(ProductImages)
        private productImagesRepository: Repository<ProductImages>,
    ) { }

    findAll(): Promise<ProductImages[]> {
        return this.productImagesRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.productImagesRepository.delete(id);
    }
    
    async create(obj): Promise<ProductImages> {
        const productImages = this.productImagesRepository.create({product_code: obj.product_code, image_url: obj.image_url})
        return this.productImagesRepository.save(productImages);
    }
}
