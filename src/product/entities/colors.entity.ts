// import { Field,Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
@Entity({ name: 'Colors'})
export class Colors {
  @PrimaryGeneratedColumn()
  // @Field(() => Int)
  color_id: number;

  @Column()
  // @Field()
  color_name: string;


  

}