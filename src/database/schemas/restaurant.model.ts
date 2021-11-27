// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Mongoose, Schema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop({required: true})
  name: string;

  @Prop({required: true, unique: true})
  uniqueName: string;

  @Prop({type: String, required: true})
  cuisines: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  createdBy: mongoose.Schema.Types.ObjectId;

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

// const RestaurantSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
        
//     },
//     uniqueName: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     cuisine: {
//         type: [String],
//         required: true
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     location: {
//         type: {
//             type: String,
//             enum: ['Point'],
//             default: "Point"
//         },
//         coordinates: {
//             type: [Number],
//             required: true
//         },
//         required: true
//     },
// }, {timestamps: true, collection: "restaurants"});

const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({location: '2dsphere'});

export {RestaurantSchema};

// export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
// export const Re