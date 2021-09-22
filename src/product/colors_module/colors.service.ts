import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Colors} from '../entities/colors.entity'
@Injectable()
export class ColorsService {
    constructor(
        @InjectRepository(Colors)
        private ColorsRepository: Repository<Colors>,
    ) { }

    findAll(): Promise<Colors[]> {
        return this.ColorsRepository.find();
    }

    findOne(id: number): Promise<Colors> {
        return this.ColorsRepository.findOne(id);
    }

    create(Colors: Colors): Promise<Colors> {
        return this.ColorsRepository.save(Colors);
    }

    async update(id: number, Colors: Colors) {
        await this.ColorsRepository.update(id, Colors)
    }

    async remove(id: number): Promise<void> {
        await this.ColorsRepository.delete(id);
    }

}
