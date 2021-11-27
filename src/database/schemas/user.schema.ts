// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { model, Model, Schema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User extends mongoose.Document {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  favCuisines: string[];

  @Prop({validate: {
    validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
    },
    message: "Please enter a valid email"
  }, required: true, trim: true})
  email: string;

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

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
        
//     },
//     favCuisines: {
//         type: [String],
//         required: true
//     },
//     email: {
//         type: String,
//         validate: {
//             validator: function(v) {
//                 return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
//             },
//             message: "Please enter a valid email"
//         },
//         required: true,
//         trim: true
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
//         }
//     },
// }, {timestamps: true, collection: "users"});

// UserSchema.index({location: '2dsphere'});

// const UserModel = mongoose.model('userModel', UserSchema);

// export const UserDoc = SchemaFactory.createForClass(UserModel);

// interface UserDoc extends mongoose.Document
// {
    
// }

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({location: '2dsphere'});

export {UserSchema};
// export {UserSchema};

