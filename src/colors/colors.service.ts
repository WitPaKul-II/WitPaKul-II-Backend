import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Colors } from './entities/colors.entity'
@Injectable()
export class ColorsService {
    constructor(
        @InjectRepository(Colors)
        private ColorsRepository: Repository<Colors>,
    ) { }

    findAll(): Promise<Colors[]> {
        return this.ColorsRepository.find();
    }

    async findOne(Colors: number): Promise<Colors> {
        const Color = await this.ColorsRepository.findOne(Colors);
        if (!Color) {
            throw new NotFoundException(`Colors ${Colors} not found`);
        }
        return Color;
    }

}
