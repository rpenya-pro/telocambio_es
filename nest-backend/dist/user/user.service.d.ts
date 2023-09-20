import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './model/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private configService;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, configService: ConfigService, jwtService: JwtService);
    create(user: User): Promise<User>;
    generateToken(user: any): string;
    validateUser(email: string, password: string): Promise<any>;
    findOneByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    unblockEnemy(userId: Types.ObjectId, enemyId: Types.ObjectId): Promise<User>;
    findOneSlug(slug: string): Promise<User>;
    update(id: string, user: User): Promise<User>;
    delete(id: string): Promise<User>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<any>;
    patchUser(id: string, updateData: any): Promise<User>;
}
