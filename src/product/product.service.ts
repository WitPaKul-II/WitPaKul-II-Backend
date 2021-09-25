import { Inject, Injectable , NotFoundException ,HttpStatus } from "@nestjs/common";
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

    // findOne(id: number): Promise<Products> {
    //     return this.productRepository.findOne(id);
    // }
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

    async update(id: number, product: Products) {
        await this.productRepository.update(id, product)
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

}
