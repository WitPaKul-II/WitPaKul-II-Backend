import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateimageDto {

    @IsString()
    @IsNotEmpty()
    product_images_id: number;

    @IsString()
    @IsNotEmpty()
    image_url: string;

}

