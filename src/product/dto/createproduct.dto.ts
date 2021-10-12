
import { IsNotEmpty, IsNumber, IsNumberString, IsString ,IsArray } from "class-validator";
import { Colors } from "src/colors/entities/colors.entity";
import { ProductImages } from "src/images/entities/productImages.entity";
import {Brands} from '../../ฺbrands/entities/brands.entity'
import { ProductActivitys } from "../entities/productActivitys.entity";

export class CreateproductDto {

    @IsString()
    @IsNotEmpty()
    product_code: string;

    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsString()
    @IsNotEmpty()
    product_description: string;
    
    @IsString()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    manufactured_date: string;

    @IsString()
    @IsNotEmpty()
    amount: string;

    @IsString()
    @IsNotEmpty()
    brand: Brands;

    @IsString()
    colors: Colors[];

    // @IsString()
    // @IsNotEmpty()
    // colors: Colors[];
    @IsString()
    @IsNotEmpty()
    product_images: ProductImages[];
    
    @IsString()
    @IsNotEmpty()
    product_activitys: ProductActivitys[];

    // @IsString()
    // @IsNotEmpty()
    // image_url: string;
}

