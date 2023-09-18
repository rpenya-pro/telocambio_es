import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.schema';
export declare class UserService {
    private userModel;
    private configService;
    constructor(userModel: Model<UserDocument>, configService: ConfigService);
    create(user: User): Promise<User>;
    generateToken(user: any): string;
    validateUser(email: string, password: string): Promise<any>;
    findOneByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneSlug(slug: string): Promise<User>;
    update(id: string, user: User): Promise<User>;
    delete(id: string): Promise<User>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<any>;
}
