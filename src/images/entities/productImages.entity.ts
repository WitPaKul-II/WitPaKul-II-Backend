// import { Field,Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Products} from '../../product/entities/products.entity'
@Entity({ name: 'Product_Images'})
export class ProductImages {
  @PrimaryGeneratedColumn()
  // @Field(() => Int)    
  product_images_id: number;

  @Column()
  // @Field()
  @ManyToOne((type) => Products , { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name : 'product_code' })
  product_code: string;

  @Column()
  // @Field()
  image_url: string;
}