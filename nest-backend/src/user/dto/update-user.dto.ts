import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  rating: number;

  @IsArray()
  badges: string[];

  @IsNotEmpty()
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  @IsArray()
  otherAddresses: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }[];

  @IsNotEmpty()
  currentLocation: {
    latitude: number;
    longitude: number;
    timestamp: Date;
  };
}
