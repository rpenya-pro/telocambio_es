import { User } from './model/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    update(id: string, user: User): Promise<User>;
    delete(id: string): Promise<User>;
}
