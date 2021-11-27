import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";


export class GetRestaurantFiltersDto {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    cuisine?: string;

}


