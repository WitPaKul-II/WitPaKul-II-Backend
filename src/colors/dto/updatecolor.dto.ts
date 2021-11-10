
import { IsNotEmpty, IsNumber, IsNumberString, IsString ,IsArray } from "class-validator";
import { ProductActivitys } from "../../product/entities/productActivitys.entity";
import { UsersCategory } from "../../users/entities/usersCategory.entity";

export class UpdateColorsDto {
    
    @IsString()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    tel: string;

    @IsString()
    address: string;

    @IsString()
    card: string;

    @IsString()
    birth_date: string;

    @IsString()
    @IsNotEmpty()
    user_type: UsersCategory;
    
    @IsString()
    user_image_url: string;

    @IsString()
    @IsNotEmpty()
    product_activitys: ProductActivitys[];

}

