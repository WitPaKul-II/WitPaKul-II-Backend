import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';
// import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UserService],
  exports:[UserService]
})
export class UsersModule {}
