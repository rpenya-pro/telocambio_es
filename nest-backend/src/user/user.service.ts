// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema, UserDocument } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    console.log(users); // Añade esta línea para depurar
    return users;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
}
