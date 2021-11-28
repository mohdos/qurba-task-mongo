// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Mongoose, Schema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';


@Schema()
export class Restaurant extends mongoose.Document { // defining restaurant schema
  @Prop({required: true})
  name: string;

  @Prop({required: true, unique: true})
  uniqueName: string;

  @Prop({type: String, required: true})
  cuisine: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users'})
  createdBy: User;

  @Prop({type: {
    type: String,
    enum: ['Point'],
    default: "Point"
  }, coordinates: {
    type: [Number],
    required: true
  }})
  location;

}

const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({location: '2dsphere'});

export {RestaurantSchema};

