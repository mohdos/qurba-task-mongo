
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { UserSchema } from "src/database/schemas/user.schema";
import { CreateUserDto } from './dto/create-user.dto';
import { GetSuggestedUsersDto } from './dto/get-suggested-users.dto';



export class UserRepository {
    constructor(@InjectModel('users') private readonly userModel: Model<typeof UserSchema>) {}

    /**
     * Creates a new user
     * 
     * @param createUserDto the user object to get created
     * 
     * @returns the created user object
     */
    async createUser(createUserDto: CreateUserDto)
    {
        const user = new this.userModel({
            ...createUserDto
        });
        const createdUser = await user.save();
        return createdUser;
    }

    async getSuggestedUsers(getSuggestedUsersDto: GetSuggestedUsersDto)
    {
        const users = await this.userModel.aggregate([
            {
                $match: {
                    "favCuisines": {$elemMatch: {$eq: getSuggestedUsersDto.cuisine}}
                    // $or: [
                    //     {
                    //         "favCuisines": {$elemMatch: {$eq: "Crepe"}}
                    //     },
                    //     {
                    //         "createdRestaurants": {
                    //             $elemMatch: {

                    //             }
                    //         }
                    //     }
                    // ]
                }
            }
        ]);
        return users;
    }
}

