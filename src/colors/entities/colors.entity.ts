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

  color_id: number;

  @Column()
  color_name: string;


}