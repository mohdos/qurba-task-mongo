import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { getNearbyRestaurantsDto } from './dto/get-nearby-restaurants.dto';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { GetRestaurantFiltersDto } from './dto/get-restaurants-filters.dto';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
    
    constructor(private restaurantRepository: RestaurantsRepository) {}

    /**
     * Creates a new restaurant
     * 
     * @param createRestaurantDto restaurant info object
     * 
     * @returns the created restaurant
     */
    async createRestaurant(createRestaurantDto: CreateRestaurantDto)
    {
        const restaurant = await this.restaurantRepository.createRestaurant(createRestaurantDto);
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
        if (!restaurant) throw new NotFoundException();
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
