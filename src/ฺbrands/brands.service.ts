import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Brands} from './entities/brands.entity'
@Injectable()
export class BrandsService { 
    constructor(
        @InjectRepository(Brands)
        private BrandsRepository: Repository<Brands>,
    ) { }

    findAll(): Promise<Brands[]> {
        return this.BrandsRepository.find();
    }

    findOne(id: number): Promise<Brands> {
        return this.BrandsRepository.findOne(id);
    }

    create(Brands: Brands): Promise<Brands> {
        return this.BrandsRepository.save(Brands);
    }

    async update(id: number, Brands: Brands) {
        await this.BrandsRepository.update(id, Brands)
    }

    async remove(id: number): Promise<void> {
        await this.BrandsRepository.delete(id);
    }

}
