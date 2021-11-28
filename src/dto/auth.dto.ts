import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuthDto {

    @IsString()
    @IsNotEmpty()
    authorization: string;
}
