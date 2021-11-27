import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber } from "class-validator";

export class MongoLocation {
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, {each: true})
    coordinates: Array<Number>
}
