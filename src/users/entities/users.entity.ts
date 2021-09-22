// import { Field,Int } from '@nestjs/graphql';
import { ProductActivitys } from 'src/product/entities/productActivitys.entity';
import {
  Column,
  Entity,
  JoinColumn,
  // JoinTable,
  // ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersCategory } from './usersCategory.entity';
@Entity({ name: 'Users'})
export class Users {
  @PrimaryGeneratedColumn()
  // @Field(() => Int)
  user_id: number;

  @Column()
  // @Field()
  username: string;

  @Column()
  // @Field()
  password: string;

  @Column()
  // @Field()
  firstname: string;

  @Column()
  // @Field()
  lastname: string;

  @Column()
  // @Field()
  email: string;

  @Column()
  // @Field()
  tel: string;

  @Column()
  // @Field()
  address: string;

  @Column()
  // @Field()
  card: string;

  @Column()
  // @Field()
  birth_date: string;
 
  @ManyToOne((type) => UsersCategory , { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name : 'user_type' })
  // @Field((type) => Users_Category )
  user_type: UsersCategory;

  @Column()
  // @Field()
  user_image_url: string;

  @OneToMany((type) => ProductActivitys, product_activitys => product_activitys.user_id)
  product_activitys: ProductActivitys[];

}