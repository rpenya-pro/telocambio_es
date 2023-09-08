export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CurrentLocation {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

export interface UserBase {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rating: number;
  badges: string[];
  address: Address;
  otherAddresses: Address[];
  currentLocation: CurrentLocation;
}

export interface UserDocument extends UserBase, Document {}
