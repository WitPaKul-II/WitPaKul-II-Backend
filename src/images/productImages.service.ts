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

}
