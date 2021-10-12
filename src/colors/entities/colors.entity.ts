// import { Field,Int } from '@nestjs/graphql';
import { Products } from 'src/product/entities/products.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'Colors'}) 
export class Colors {


  @PrimaryGeneratedColumn()
  // @Field(() => Int)
  color_id: number;

  @Column()
  // @Field()
  color_name: string;

  @ManyToMany(type => Products, products => products.colors)
  products: Products[]
  

}