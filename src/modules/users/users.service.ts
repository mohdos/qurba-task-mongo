import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import {UserDoc} from '../../database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    
    constructor(private userRepository: UserRepository) {}

    /**
     * Creates a new user
     * 
     * @param createUserDto the user object to get created
     * 
     * @returns the created user object
     */
    async createUser(createUserDto: CreateUserDto)
    {
        const user = await this.userRepository.createUser(createUserDto);
        return user;
    }


}
