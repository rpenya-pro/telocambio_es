export interface Friend {
  idFriend: string;
  addedOn: Date;
}

interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface CurrentLocation {
  latitude?: number;
  longitude?: number;
  timestamp?: Date;
}

export interface Usuario {
  _id?: string;
  firstName?: string;
  lastName?: string;
  privateProfile?: boolean;
  memberSince?: Date;
  password: string;
  email: string;
  avatar?: string;
  slug?: string;
  rating?: number;
  badges?: string[];
  address?: Address;
  otherAddresses?: Address[];
  currentLocation?: CurrentLocation;
  friends?: Friend[]; // Actualización de la estructura de friends
  themesprefered?: string[];
}
