import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { MongoLocation } from "src/dto/location.dto";



export class CreateRestaurantDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    uniqueName: string;
    
    @IsString()
    cuisine: string;

    @IsObject()
    @ValidateNested()
    @Type(() => MongoLocation)
    location: Object;

}


