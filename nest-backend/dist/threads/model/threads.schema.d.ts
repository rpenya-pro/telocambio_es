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
export declare class Thread {
    threadTemathic: string[];
    owner: string;
    publishDate: Date;
    description: string;
    isAdultContent: boolean;
    isBook: boolean;
    isVynifa: boolean;
    isGame: boolean;
    isComic: boolean;
    isOther: boolean;
    bookTitle: string;
    bookAuthor: string;
    bookISBN: string;
    bookEditorial: string;
    bookNumberEdition: string;
    bookYearEdition: string;
    bookDescription: string;
    bookImages: string[];
    vynilTitle: string;
    vynilArtist: string;
    vynilDiscography: string;
    vynilYearEdition: string;
    vynilDescription: string;
    vynilImages: string[];
    gameTitle: string;
    gameCategory: string;
    gamePegy: string;
    gameDistribuitor: string;
    gameYearEdition: string;
    gameDescription: string;
    gameImages: string[];
    comicTitle: string;
    comicAuthor: string;
    comicISBN: string;
    comicEditorial: string;
    comicNumberEdition: string;
    comicYearEdition: string;
    comicDescription: string;
    comicImages: string[];
    otherTitle: string;
    otherAuthor: string;
    otherISBN: string;
    otherEditorial: string;
    otherNumberEdition: string;
    otherYearEdition: string;
    otherDescription: string;
    otherImages: string[];
    otherArtist: string;
    otherDiscography: string;
    otherCategory: string;
    otherPegy: string;
    otherDistribuitor: string;
    ownerResponsaCopy: string;
    qualityStatus: string;
    content: string;
    qualification: {
        score: number;
        date: Date;
    }[];
    comments: Types.ObjectId[];
}
export type ThreadDocument = Thread & Document;
export declare const ThreadSchema: import("mongoose").Schema<Thread, import("mongoose").Model<Thread, any, any, any, Document<unknown, any, Thread> & Thread & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Thread, Document<unknown, {}, Thread> & Thread & {
    _id: Types.ObjectId;
}>;
