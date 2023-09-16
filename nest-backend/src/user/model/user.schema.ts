// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatar: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  publishDate: Date;

  @Prop()
  rating: number;

  @Prop([String])
  themesprefered: string[];

  @Prop({ type: Boolean, default: true })
  privateProfile: boolean;

  @Prop([String])
  badges: string[];

  @Prop({
    type: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  })
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  @Prop({
    type: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  })
  otherAddresses: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  @Prop({
    type: {
      latitude: Number,
      longitude: Number,
      timestamp: Date,
    },
  })
  currentLocation: {
    latitude: number;
    longitude: number;
    timestamp: Date;
  };

  @Prop({
    type: [
      {
        idFriend: { type: Types.ObjectId, required: true },
        addedOn: { type: Date, required: true, default: Date.now },
      },
    ],
  })
  friends: {
    idFriend: Types.ObjectId;
    addedOn: Date;
  }[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
