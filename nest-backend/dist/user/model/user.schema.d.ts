/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Types } from 'mongoose';
export declare class User {
    firstName: string;
    lastName: string;
    avatar: string;
    slug: string;
    email: string;
    password: string;
    publishDate: Date;
    rating: number;
    themesprefered: string[];
    themesblocked: string[];
    privateProfile: boolean;
    freezeProfile: boolean;
    badges: string[];
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    otherAddresses: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    currentLocation: {
        latitude: number;
        longitude: number;
        timestamp: Date;
    };
    friends: {
        idFriend: Types.ObjectId;
        addedOn: Date;
    }[];
    peopleBlocked: {
        idEnemy: Types.ObjectId;
        addedOn: Date;
    }[];
}
export type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, User> & User & {
    _id: Types.ObjectId;
}>;
