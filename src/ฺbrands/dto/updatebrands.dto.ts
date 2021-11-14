import { IsNotEmpty, IsNumber, IsNumberString, IsString ,IsArray } from "class-validator";
import { Products } from "src/product/entities/products.entity";
export class UpdateBrandsDto {
    
    @IsNumber()
    @IsNotEmpty()
    brand_id: number;

    @IsString()
    @IsNotEmpty()
    // @Field()
    brand_name: string;
  
    @IsString()
    product: Products[];
}