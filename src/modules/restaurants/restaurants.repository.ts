import { ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { vars } from "src/config/vars";
import { RestaurantSchema } from "src/database/schemas/restaurant.schema";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { getNearbyRestaurantsDto } from "./dto/get-nearby-restaurants.dto";
import { GetRestaurantDto } from "./dto/get-restaurant.dto";
import { GetRestaurantFiltersDto } from "./dto/get-restaurants-filters.dto";



export class RestaurantsRepository {

    constructor(@InjectModel('restaurants') private readonly restaurantModel: Model<typeof RestaurantSchema>) {}

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
        const restaurant = new this.restaurantModel({
            ...createRestaurantDto,
            createdBy: userId
        });
        const restaurantSaved = await restaurant.save();
        return restaurantSaved;
    }

    /**
     * Gets restaurants with filters if provided
     * 
     * @param getRestaurantsDto filters object
     * 
     * @returns array of restaurants satisfying filters or all restaurants
     */
    async getRestaurants(filtersDto: GetRestaurantFiltersDto)
    {
        let filtersObj = {};
        for (let key of Object.keys(filtersDto))
        {
            if (filtersDto[key]) filtersObj[key] = filtersDto[key];
        }
        const restaurants = await this.restaurantModel.find({
            // ...(filtersDto.cuisine && {cuisine: filtersDto.cuisine})
            ...filtersObj
        });

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
        const restaurant = await this.restaurantModel.findOne({
            ...(getRestaurantDto.id && {_id: getRestaurantDto.id}),
            ...(getRestaurantDto.uniqueName && {uniqueName: getRestaurantDto.uniqueName})
        });
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
        const restaurants = await this.restaurantModel.find({
            location:
            { 
                $near:
                {
                    // $geometry: { type: "Point",  coordinates: [ getNearbyRestaurantsDto.location.coordinates[0], getNearbyRestaurantsDto.location.coordinates[1] ] },
                    $geometry: { type: "Point",  coordinates: [ getNearbyRestaurantsDto.lat, getNearbyRestaurantsDto.lng ] },
                    $minDistance: 0, // distance in metres
                    $maxDistance: vars.nearbyRestaurantsDistance * 1000 // distance in metres
                }
            }
        });
        return restaurants;
    }

}


