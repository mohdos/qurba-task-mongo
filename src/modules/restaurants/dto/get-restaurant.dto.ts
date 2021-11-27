import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateIf } from "class-validator";



export class GetRestaurantDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ValidateIf(obj => (obj.id && !obj.uniqueName) || (!obj.id && obj.uniqueName))
    id?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ValidateIf(obj => (obj.id && !obj.uniqueName) || (!obj.id && obj.uniqueName))
    uniqueName?: string;

}


