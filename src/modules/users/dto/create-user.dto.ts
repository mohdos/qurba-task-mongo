import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsObject, Length, Validate, ValidateNested } from "class-validator";
import { MongoLocation } from "src/dto/location.dto";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ArrayMinSize(1)
    favCuisines: string[];

    @IsObject()
    @ValidateNested()
    @Type(() => MongoLocation)
    location: {coordinates: Array<Number>};
}
