interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CurrentLocation {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

export interface Usuario {
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
  badges: string[];
  address: Address;
  otherAddresses: Address;
  currentLocation: CurrentLocation;
}
