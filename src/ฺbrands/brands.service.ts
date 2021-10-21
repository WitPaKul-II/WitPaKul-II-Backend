import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Brands } from './entities/brands.entity'
@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brands)
        private BrandsRepository: Repository<Brands>,
    ) { }

    findAll(): Promise<Brands[]> {
        return this.BrandsRepository.find();
    }

    async findOne(id: number): Promise<Brands> {
        const Brands = await this.BrandsRepository.findOne(id);
        if (!Brands) {
            throw new NotFoundException(`Brands ${id} not found`);
        }
        return Brands;}

}
