
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { UserSchema } from "src/database/schemas/user.schema";
import { CreateUserDto } from './dto/create-user.dto';



export class UserRepository {
    constructor(@InjectModel('users') private readonly userModel: Model<typeof UserSchema>) {}

    async createUser(createUserDto: CreateUserDto)
    {
        const user = new this.userModel({
            ...createUserDto
        });
        const createdUser = await user.save();
        return createdUser;
    }
}

