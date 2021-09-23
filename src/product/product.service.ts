import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Products} from './entities/products.entity'
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
    ) { }

    findAll(): Promise<Products[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<Products> {
        return this.productRepository.findOne(id);
    }

    create(product: Products): Promise<Products> {
        return this.productRepository.save(product);
    }

    async update(id: number, product: Products) {
        await this.productRepository.update(id, product)
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

}
