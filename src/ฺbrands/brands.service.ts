import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brands } from './entities/brands.entity';
import { UpdateBrandsDto } from './dto/updatebrands.dto';
@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private BrandsRepository: Repository<Brands>,
  ) {}

  findAll(): Promise<Brands[]> {
    return this.BrandsRepository.find();
  }

  async findOne(id: number): Promise<Brands> {
    const Brands = await this.BrandsRepository.findOne(id);
    if (!Brands) {
      throw new NotFoundException(`Brands ${id} not found`);
    }
    return Brands;
  }

  async findOneByQuery(Brands: any): Promise<Brands> {
    const brands = await this.BrandsRepository.findOne(Brands);
    console.log(brands);

    if (!brands) {
      throw new NotFoundException(`Not found`);
    }
    return brands;
  }

  async create(brands: Brands): Promise<Brands> {
    const checking_brands = await this.BrandsRepository.findOne(
      brands.brand_id,
    );
    if (!brands.brand_id) {
      throw new NotAcceptableException(`brands ${brands.brand_id} invalid`);
    }

    if (checking_brands && checking_brands.brand_id === brands.brand_id) {
      throw new NotAcceptableException(
        `Brand ${brands.brand_id} already existed`,
      );
    }
    return this.BrandsRepository.save(brands);
  }

  async update(brand_id: number, NewBrand: UpdateBrandsDto) {
    const updatepro = await this.BrandsRepository.findOne(brand_id);
    if (!updatepro) {
      throw new NotFoundException(`brand_id not found`);
    }
    return this.BrandsRepository.save(NewBrand);
  }

  async remove(brand_id: number) {
    const dd = await this.BrandsRepository.findOne(brand_id);
    if (!dd) {
      throw new NotFoundException(`brand_id not found`);
    }
    return this.BrandsRepository.delete(brand_id);
  }
}
