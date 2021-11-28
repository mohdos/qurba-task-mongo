import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { vars } from 'src/config/vars';
import { UsersService } from '../users/users.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { getNearbyRestaurantsDto } from './dto/get-nearby-restaurants.dto';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { GetRestaurantFiltersDto } from './dto/get-restaurants-filters.dto';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
    
    constructor(private restaurantRepository: RestaurantsRepository, private userService: UsersService, private configService: ConfigService) {}

    /**
     * Creates a new restaurant
     * 
     * @param createRestaurantDto restaurant info object
     * @param userId id of the user who is creating this restaurant
     * 
     * @returns the created restaurant
     */
    async createRestaurant(createRestaurantDto: CreateRestaurantDto, userId: string)
    {
        const [clashRestaurant, user] = await Promise.all([this.restaurantRepository.getRestaurant({uniqueName: createRestaurantDto.uniqueName}), this.userService.getUserById(userId)]);
        
        if (clashRestaurant) throw new ConflictException('A restaurant already exists with this unique name');
        else if (!user) throw new NotFoundException('The provided user is not found');

        const restaurant = await this.restaurantRepository.createRestaurant(createRestaurantDto, userId);
        axios.post(this.configService.get('ELASTICSEARCH_URL') + vars.ELASTICSEARCH_INDEX_ENDPOINT, {
            name: createRestaurantDto.name,
            uniqueName: createRestaurantDto.uniqueName,
            cuisine: createRestaurantDto.cuisine
        }).then(response => {Logger.log("Created index for restaurant")}).catch(error => Logger.error(`Error creating restaurant index: ${error}`))
        // this.restaurantsSearchService.indexRestaurant({...createRestaurantDto}).then();
        return restaurant;
    }

    /**
     * Gets restaurants with filters if provided
     * 
     * @param getRestaurantsDto filters object
     * 
     * @returns array of restaurants satisfying filters or all restaurants
     */
    async getRestaurants(getRestaurantsDto: GetRestaurantFiltersDto)
    {
        const restaurants = await this.restaurantRepository.getRestaurants(getRestaurantsDto);
        return restaurants;
    }

    /**
     * Gets a restaurant by id or unique name
     * 
     * @param getRestaurantDto id of unique name to match
     * 
     * @returns the restaurant object
     */
    async getRestaurant(getRestaurantDto: GetRestaurantDto)
    {
        const restaurant = await this.restaurantRepository.getRestaurant(getRestaurantDto);
        if (!restaurant) throw new NotFoundException('No restaurant found');
        return restaurant;
    }


    /**
     * Gets restaurants nearby supplied location/coordinates
     * 
     * @param getNearbyRestaurantsDto coordinates of origin to get nearby restaurants from
     * 
     * @returns array of nearby restaurants
     */
    async getNearbyRestaurants(getNearbyRestaurantsDto: getNearbyRestaurantsDto)
    {
        const restaurants = await this.restaurantRepository.getNearbyRestaurants(getNearbyRestaurantsDto);
        return restaurants;
    }

}
