import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { Users } from "../entities/users.entity";

export class userCategoryDto {

    @IsString()
    @IsNotEmpty()
    type_id: string;


    @IsString()
    @IsNotEmpty()
    type_name: string;

    @IsString()
    @IsNotEmpty()
    user: Users[];
}

