import mongoose from "mongoose";
import { Usuario } from "../interfaces";

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

const CurrentLocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: Date,
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rating: { type: Number, required: true },
  badges: [{ type: String }],
  address: { type: AddressSchema, required: true },
  otherAddresses: [AddressSchema],
  currentLocation: { type: CurrentLocationSchema, required: true },
});

export const User = mongoose.model<Usuario>("User", UserSchema);
