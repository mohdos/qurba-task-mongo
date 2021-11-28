
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema, ObjectId } from 'mongoose';

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

    /**
     * Gets a user by Id (_id)
     * 
     * @param userId the id of the user
     * 
     * @returns user document (if exists)
     */
    async getUserById(userId: string)
    {
        const user = await this.userModel.findById(userId);
        return user;
    }

    /**
     * Get suggested users based on cuising
     * @param getSuggestedUsersDto object to get suggested users (currently cuisine)
     * @returns array fo suggested users
     */
    async getSuggestedUsers(getSuggestedUsersDto: GetSuggestedUsersDto)
    {
        const users = await this.userModel.aggregate([
            {
                $lookup: { // lookup restaurants table and return created restaurants with key restaurantsCreated
                    from: "restaurants",
                    localField: "_id",
                    foreignField: "createdBy",
                    as: "restaurantsCreated"
                }
            },
            {
                $match: {
                        $or: [
                            {
                                "restaurantsCreated.cuisine": getSuggestedUsersDto.cuisine // search in the restaurantsCreated returned from lookup if any of the cuisines is fried chicken
                            },
                            {
                                "favCuisines": { // or if the user has the cuisine in favCuisines
                                    $elemMatch: {
                                        $eq: getSuggestedUsersDto.cuisine
                                    }
                                }
                            }
                        ]
                }
            },
            {
                $project: {
                    "restaurantsCreated": 0 // don't return the array of created restaurants with the result
                }
            }
        ]);
        
        return users;
    }
}

