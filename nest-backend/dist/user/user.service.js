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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./model/user.schema");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userModel, configService, jwtService) {
        this.userModel = userModel;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async create(user) {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new common_1.ConflictException('El usuario ya existe');
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
    generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
        };
        return this.jwtService.sign(payload);
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email }).exec();
    }
    async findAll() {
        const users = await this.userModel.find().exec();
        return users;
    }
    async findOne(id) {
        const user = await this.userModel.findById(id);
        return user;
    }
    async unblockEnemy(userId, enemyId) {
        console.log('Service unblockEnemy - userId:', userId, 'enemyId:', enemyId);
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.peopleBlocked = user.peopleBlocked.filter((enemy) => !enemy.idEnemy.equals(enemyId));
        return user.save();
    }
    async findOneSlug(slug) {
        const user = await this.userModel.findOne({ slug });
        return user;
    }
    async update(id, user) {
        return this.userModel.findByIdAndUpdate(id, user, { new: true });
    }
    async delete(id) {
        return this.userModel.findByIdAndRemove(id);
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado.');
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('La contraseña actual es incorrecta.');
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        return { message: 'Contraseña actualizada con éxito' };
    }
    async patchUser(id, updateData) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado.');
        }
        if (updateData.password) {
            const salt = await bcrypt.genSalt();
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!updatedUser) {
            throw new common_1.NotFoundException('Error al actualizar el usuario.');
        }
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map