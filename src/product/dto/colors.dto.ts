import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ColorsDto {

    @IsString()
    @IsNotEmpty()
    color_id: number;


    @IsString()
    @IsNotEmpty()
    color_name: string;
}

