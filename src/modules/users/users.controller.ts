import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    /**
     * Creates a new user
     * 
     * @param createUserDto the user object to get created
     * 
     * @returns the created user object
     */
    @Post()
    createUser(@Body() createUserDto: CreateUserDto)
    {
        const user = this.userService.createUser(createUserDto);
        return user;
    }
}
