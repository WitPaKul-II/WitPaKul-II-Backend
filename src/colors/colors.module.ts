import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colors } from './entities/colors.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
// import { Users } from './entity/users.entity';
// import { UserService } from './users.service';
// import { GraphQLModule } from '@nestjs/graphql'; 
@Module({
  imports: [TypeOrmModule.forFeature([Colors]),forwardRef(() => AuthModule),forwardRef(() => ProductModule),],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
