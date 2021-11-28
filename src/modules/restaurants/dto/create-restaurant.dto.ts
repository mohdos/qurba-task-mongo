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
    @IsNotEmpty()
    cuisine: string;

    @IsObject()
    @ValidateNested()
    @Type(() => MongoLocation)
    location: {coordinates: Array<Number>};

}


