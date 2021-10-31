import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductImagesService } from '../images/productImages.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { ProductImages } from '../images/entities/productImages.entity';
import { ColorsModule } from 'src/colors/colors.module';
import { ColorsService } from 'src/colors/colors.service';
import { Colors } from 'src/colors/entities/colors.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/authorization/roles.guard';
// import { Users } from './entity/users.entity';
// import { UserService } from './users.service';
// import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductImages, Colors]),forwardRef(() => AuthModule)],
  controllers: [ProductController],
  providers: [ProductService, ProductImagesService],
})
export class ProductModule {}
