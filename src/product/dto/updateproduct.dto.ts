import { IsNotEmpty, IsNumber, IsNumberString, IsString, IsArray  } from "class-validator";
import { Colors } from "src/colors/entities/colors.entity";
import { ProductImages } from "src/images/entities/productImages.entity";
import { Brands } from "src/ฺbrands/entities/brands.entity";
import { ManyToMany } from "typeorm";
import { ProductActivitys } from "../entities/productActivitys.entity";
import { ColorsDto } from "./colors.dto";

export class UpdateproductDto {

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

    // @IsArray()
    
    @IsString()
    @IsNotEmpty()
    colors: Colors[];
    // colors:{ Colors: ["color_id", "product_code"]; }

    @IsString()
    product_images: ProductImages[];
    
    @IsString()
    product_activitys: ProductActivitys[];

   
}