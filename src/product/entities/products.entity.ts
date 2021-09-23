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
import { Brands } from '../../ฺbrands/entities/brands.entity';
import { Colors } from '../../colors/entities/colors.entity';
import { ProductActivitys } from './productActivitys.entity';
import { ProductImages } from '../../images/entities/productImages.entity';

@Entity({ name: 'Products'})
export class Products {
  @PrimaryGeneratedColumn()
  // @Field(() => Int)
  product_code: string;

  @Column()
  // @Field()
  product_name: string;

  @Column()
  // @Field()
  product_description: string;

  @Column()
  // @Field()
  price: number;

  @Column()
  // @Field()
  manufactured_date: string;
  
  @Column()
  // @Field()
  amount: string;
  
  @ManyToOne((type) => Brands , { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name : 'brand' })
  // @Field((type) => Users_Category )
  brand: Brands;

  @ManyToMany((type) => Colors,{eager:true})
    @JoinTable({
        name: 'product_colors',
        joinColumn: {
            name: 'product_code',
            referencedColumnName: 'product_code'
        },
        inverseJoinColumn: {
            name: 'color_id',
            referencedColumnName: 'color_id'
        }
    })
    colors: Colors[];

  @OneToMany((type) => ProductImages, product_images => product_images.product_code)
  product_images: ProductImages[];

  @OneToMany((type) => ProductActivitys, product_activitys => product_activitys.product_code)
  product_activitys: ProductActivitys[];

}