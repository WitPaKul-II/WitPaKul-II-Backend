// import { Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
@Entity({ name: 'Users_Category'})
export class UsersCategory {
  @PrimaryGeneratedColumn()
  // @Field()
  type_id: string;

  @Column()
  // @Field()
  type_name: string;

  @OneToMany((type) => Users, user => user.user_type)
  user: Users[];
  
}