import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetSuggestedUsersDto } from './dto/get-suggested-users.dto';
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

    /**
     * Gets users based on cuisine
     * 
     * @param getSuggestedUsersDto object holding cuisine to search suggested user
     * 
     * @returns users satisfying the cuisine provided
     */
    @Get('/:cuisine')
    getSuggestedUsers(@Param() getSuggestedUsersDto: GetSuggestedUsersDto)
    {
        const users = this.userService.getSuggestedUsers(getSuggestedUsersDto);
        return users;
    }
}
