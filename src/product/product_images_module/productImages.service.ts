import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {ProductImages} from '../entities/productImages.entity'
@Injectable()
export class ProductImagesService {
    constructor(
        @InjectRepository(ProductImages)
        private productImagesRepository: Repository<ProductImages>,
    ) { }

    findAll(): Promise<ProductImages[]> {
        return this.productImagesRepository.find();
    }

    findOne(id: number): Promise<ProductImages> {
        return this.productImagesRepository.findOne(id);
    }

    create(product: ProductImages): Promise<ProductImages> {
        return this.productImagesRepository.save(product);
    }

    async update(id: number, product: ProductImages) {
        await this.productImagesRepository.update(id, product)
    }

    async remove(id: number): Promise<void> {
        await this.productImagesRepository.delete(id);
    }

}
