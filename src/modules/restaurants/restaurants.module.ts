import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from 'src/database/schemas/restaurant.model';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'restaurants', schema: RestaurantSchema}])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository]
})
export class RestaurantsModule {}
