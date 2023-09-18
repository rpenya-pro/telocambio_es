import { User } from './model/user.schema';
import { UserService } from './user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ChangePasswordDto } from './change-password.dto';
export declare class UserController {
    private readonly userService;
    private readonly cloudinaryService;
    constructor(userService: UserService, cloudinaryService: CloudinaryService);
    defaultValue(): string;
    create(user: User): Promise<User>;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    renewToken(renewDto: {
        email: string;
    }): Promise<{
        access_token: string;
    }>;
    getAllUsers(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    findOneBySlug(slug: string): Promise<User>;
    uploadImage(image: any): Promise<any>;
    update(id: string, user: User): Promise<User>;
    delete(id: string): Promise<User>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<any>;
}
