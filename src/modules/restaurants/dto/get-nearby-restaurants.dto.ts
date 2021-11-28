import { Type } from "class-transformer";
import { IsNumber, IsObject, ValidateNested } from "class-validator";
import { MongoLocation } from "src/dto/location.dto";



export class getNearbyRestaurantsDto {

    @Type(() => Number)
    @IsNumber()
    lat: number;

    @Type(() => Number)
    @IsNumber()
    lng: number;

}


