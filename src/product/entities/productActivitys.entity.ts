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
import { Users } from 'src/users/entities/users.entity';
import { Products } from './products.entity';
@Entity({ name: 'Product_Activitys'})
export class ProductActivitys {
  @PrimaryGeneratedColumn()
  // @Field(() => Int)
  activity_code: number;

  @Column()
  // @Field()
  @ManyToOne((type) => Users , { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name : 'user_id' })
  user_id: string;

  @Column()
  // @Field()
  @ManyToOne((type) => Products , { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name : 'product_code' })
  product_code: string;

  @Column()
  // @Field()
  action_type: string;

  @Column()
  // @Field()
  date_time: string;

}