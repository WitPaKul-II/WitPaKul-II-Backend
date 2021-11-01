import {
  Inject,
  Injectable,
  NotFoundException,
  NotAcceptableException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colors } from 'src/colors/entities/colors.entity';
import { ProductImages } from 'src/images/entities/productImages.entity';
import { Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { ColorsService } from '../colors/colors.service';
import { UpdateproductDto } from './dto/updateproduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  findAll(): Promise<Products[]> {
    return this.productRepository.find();
  }

  async findOne(productcode: number): Promise<Products> {
    const Products = await this.productRepository.findOne(productcode);
    if (!Products) {
      throw new NotFoundException(`productcode ${productcode} not found`);
    }
    return Products;
  }

  //  do it in midterm
  async create(product: Products): Promise<Products> {
    const checking_product = await this.productRepository.findOne(
      product.product_code,
    );
    if (!product.product_code) {
      throw new NotAcceptableException(
        `productcode ${product.product_code} invalid`,
      );
    }
    if (
      checking_product &&
      checking_product.product_code === product.product_code
    ) {
      throw new NotAcceptableException(
        `productcode ${product.product_code} already existed`,
      );
    }
    return this.productRepository.save(product);
  }
  // ProductImages
  creates(product: ProductImages): Promise<ProductImages> {
    return this.productRepository.save(product);
  }

  async update(productcode: string, product: UpdateproductDto) {
    const updatepro = await this.productRepository.findOne(productcode);
    if (!updatepro) {
      throw new NotFoundException(`productcode not found`);
    }
    return this.productRepository.save(product);
  }

  async remove(productcode: string) {
    const dd = await this.productRepository.findOne(productcode);
    if (!dd) {
      throw new NotFoundException(`productcode not found`);
    }
    return this.productRepository.delete(productcode);
  }
}
