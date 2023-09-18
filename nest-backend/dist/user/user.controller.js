"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./model/user.schema");
const platform_express_1 = require("@nestjs/platform-express");
const user_service_1 = require("./user.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const change_password_dto_1 = require("./change-password.dto");
const jwt_guard_1 = require("../jwt-guard");
let UserController = class UserController {
    constructor(userService, cloudinaryService) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
    }
    defaultValue() {
        return 'Este es el valor predeterminado.';
    }
    async create(user) {
        return this.userService.create(user);
    }
    async login(loginDto) {
        const user = await this.userService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        return { access_token: this.userService.generateToken(user) };
    }
    async renewToken(renewDto) {
        const user = await this.userService.findOneByEmail(renewDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found.');
        }
        return { access_token: this.userService.generateToken(user) };
    }
    getAllUsers() {
        return this.userService.findAll();
    }
    async findOneById(id) {
        return this.userService.findOne(id);
    }
    async findOneBySlug(slug) {
        return this.userService.findOneSlug(slug);
    }
    async uploadImage(image) {
        if (!image || !image.buffer) {
            throw new common_1.BadRequestException('No se proporcionó un archivo válido.');
        }
        const result = await this.cloudinaryService.uploadImage(image.buffer);
        return { imageUrl: result.url };
    }
    async update(id, user) {
        return this.userService.update(id, user);
    }
    async delete(id) {
        return this.userService.delete(id);
    }
    async changePassword(id, changePasswordDto) {
        try {
            return this.userService.changePassword(id, changePasswordDto.currentPassword, changePasswordDto.newPassword);
        }
        catch (error) {
            if (error.message === 'La contraseña actual es incorrecta.') {
                throw new common_1.HttpException('La contraseña actual es incorrecta.', common_1.HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('defaultValue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "defaultValue", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('renew'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "renewToken", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneBySlug", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('change-password/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        cloudinary_service_1.CloudinaryService])
], UserController);
//# sourceMappingURL=user.controller.js.map