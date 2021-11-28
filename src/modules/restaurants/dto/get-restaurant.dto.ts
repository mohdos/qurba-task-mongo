import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateIf } from "class-validator";



export class GetRestaurantDto {

    @IsString()
    @IsNotEmpty()
    @ValidateIf(obj => !obj.uniqueName)
    id?: string;

    @IsString()
    @IsNotEmpty()
    @ValidateIf(obj => !obj.id)
    uniqueName?: string;

}


