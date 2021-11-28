import { Body, Controller, Get, Header, Headers, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { getNearbyRestaurantsDto } from './dto/get-nearby-restaurants.dto';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { GetRestaurantFiltersDto } from './dto/get-restaurants-filters.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
    
    constructor(private restaurantService: RestaurantsService) {}

    /**
     * Creates a new restaurant
     * 
     * @param createRestaurantDto restaurant info object
     * 
     * @returns the created restaurant
     */
    @Post()
    createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto, @Headers() headers: AuthDto)
    {
        const restaurant = this.restaurantService.createRestaurant(createRestaurantDto, headers.authorization);
        return restaurant;
    }

    /**
     * Gets restaurants with filters if provided
     * 
     * @param getRestaurantsDto filters object
     * 
     * @returns array of restaurants satisfying filters or all restaurants
     */
    @Get()
    getRestaurants(@Query() getRestaurantsDto: GetRestaurantFiltersDto)
    {
        const restaurants = this.restaurantService.getRestaurants(getRestaurantsDto);
        return restaurants;
    }

    /**
     * Gets restaurants nearby supplied location/coordinates
     * 
     * @param getNearbyRestaurantsDto coordinates of origin to get nearby restaurants from
     * 
     * @returns array of nearby restaurants
     */
    @Get('/nearby')
    getNearbyRestaurants(@Query() getNearbyRestaurantsDto: getNearbyRestaurantsDto)
    {
        const restaurants = this.restaurantService.getNearbyRestaurants(getNearbyRestaurantsDto);
        return restaurants;
    }

    /**
     * Gets a restaurant by id or unique name
     * 
     * @param getRestaurantDto id of unique name to match
     * 
     * @returns the restaurant object
     */
    @Get('/search')
    getRestaurant(@Query() getRestaurantDto: GetRestaurantDto)
    {
        const restaurant = this.restaurantService.getRestaurant(getRestaurantDto);
        return restaurant;
    }

    

}
