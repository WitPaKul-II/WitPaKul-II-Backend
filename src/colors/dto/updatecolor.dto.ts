
import { IsNotEmpty, IsNumber, IsNumberString, IsString ,IsArray } from "class-validator";
import { ProductActivitys } from "../../product/entities/productActivitys.entity";
import { UsersCategory } from "../../users/entities/usersCategory.entity";

export class UpdateColorsDto {
    
    @IsNotEmpty()
    @IsString() 
    color_id: number;
    
    @IsNotEmpty()
    @IsString()
    color_name: string;

    @IsNotEmpty()
    @IsString()
    color_code: string;
}

