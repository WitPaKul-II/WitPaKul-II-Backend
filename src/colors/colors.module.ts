import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colors } from './entities/colors.entity';
// import { Users } from './entity/users.entity';
// import { UserService } from './users.service';
// import { GraphQLModule } from '@nestjs/graphql'; 
@Module({
  imports: [TypeOrmModule.forFeature([Colors])],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
