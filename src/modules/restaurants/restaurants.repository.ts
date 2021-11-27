import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RestaurantSchema } from "src/database/schemas/restaurant.model";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { GetRestaurantDto } from "./dto/get-restaurant.dto";
import { GetRestaurantFiltersDto } from "./dto/get-restaurants-filters.dto";



export class RestaurantsRepository {

    constructor(@InjectModel('restaurants') private readonly restaurantModel: Model<typeof RestaurantSchema>) {}

    async createRestaurant(createRestaurantDto: CreateRestaurantDto)
    {
        const restaurant = new this.restaurantModel({
            ...createRestaurantDto
        });
        const restaurantSaved = await restaurant.save();
        return restaurantSaved;
    }

    async getRestaurants(filtersDto: GetRestaurantFiltersDto)
    {
        const restaurants = await this.restaurantModel.find({
            ...(filtersDto.cuisine && {cuisine: filtersDto.cuisine})
        });

        return restaurants;
    }

    async getRestaurant(getRestaurantDto: GetRestaurantDto)
    {
        const restaurant = await this.restaurantModel.findOne({
            ...(getRestaurantDto.id && {_id: getRestaurantDto.id}),
            ...(getRestaurantDto.uniqueName && {uniqueName: getRestaurantDto.uniqueName})
        });
        return restaurant;
    }

}


