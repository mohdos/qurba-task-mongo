import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import {UserDoc} from '../../database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { GetSuggestedUsersDto } from './dto/get-suggested-users.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(private userRepository: UserRepository) { }

    /**
     * Creates a new user
     * 
     * @param createUserDto the user object to get created
     * 
     * @returns the created user object
     */
    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userRepository.createUser(createUserDto);
        return user;
    }

    /**
     * Gets a user by Id (_id)
     * 
     * @param userId the id of the user
     * 
     * @returns user document (if exists)
     */
    async getUserById(userId: string) {
        return await this.userRepository.getUserById(userId);
    }


    /**
     * Get suggested users based on cuising
     * @param getSuggestedUsersDto object to get suggested users (currently cuisine)
     * @returns array fo suggested users
     */
    async getSuggestedUsers(getSuggestedUsersDto: GetSuggestedUsersDto) {
        const users = await this.userRepository.getSuggestedUsers(getSuggestedUsersDto);
        return users;
    }

}
