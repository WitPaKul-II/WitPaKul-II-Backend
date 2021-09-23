import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {ProductActivitys} from '../entities/productActivitys.entity'
@Injectable()
export class ProductActivitysService {
    constructor(
        @InjectRepository(ProductActivitys)
        private productActivitysRepository: Repository<ProductActivitys>,
    ) { }

    findAll(): Promise<ProductActivitys[]> {
        return this.productActivitysRepository.find();
    }

    findOne(id: number): Promise<ProductActivitys> {
        return this.productActivitysRepository.findOne(id);
    }

    create(product: ProductActivitys): Promise<ProductActivitys> {
        return this.productActivitysRepository.save(product);
    }

    async update(id: number, product: ProductActivitys) {
        await this.productActivitysRepository.update(id, product)
    }

    async remove(id: number): Promise<void> {
        await this.productActivitysRepository.delete(id);
    }

}
