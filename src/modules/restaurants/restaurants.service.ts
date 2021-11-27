import { Inject, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
    
    constructor(private restaurantRepository: RestaurantsRepository) {}

    async createRestaurant(createRestaurantDto: CreateRestaurantDto)
    {
        const restaurant = await this.restaurantRepository.createRestaurant(createRestaurantDto);
        return restaurant;
    }

}
