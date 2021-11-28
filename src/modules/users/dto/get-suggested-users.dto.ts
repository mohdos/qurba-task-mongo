import { IsNotEmpty, IsString } from "class-validator";



export class GetSuggestedUsersDto {
    @IsString()
    @IsNotEmpty()
    cuisine: string;
}

