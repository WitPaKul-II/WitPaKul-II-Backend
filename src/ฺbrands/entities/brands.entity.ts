// import { Field,Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Products} from '../../product/entities/products.entity'
@Entity({ name: 'Brands'})
export class Brands {
  @PrimaryGeneratedColumn()
  // @Field(() => Int)
  brand_id: string;

  @Column()
  // @Field()
  brand_name: string;

  @OneToMany((type) => Products, product => product.brand)
  product: Products[];

}