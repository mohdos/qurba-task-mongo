import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from 'src/database/schemas/restaurant.schema';
import { UsersModule } from '../users/users.module';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'restaurants', schema: RestaurantSchema}]), UsersModule, ConfigModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository]
})
export class RestaurantsModule {}
