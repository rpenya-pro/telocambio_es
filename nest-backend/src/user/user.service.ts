// user.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jsrsasign from 'jsrsasign';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema, UserDocument } from './model/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: User): Promise<User> {
    // Comprueba si el email ya existe en la base de datos
    const existingUser = await this.userModel.findOne({ email: user.email });

    if (existingUser) {
      throw new ConflictException('El usuario ya existe'); // Lanza una excepción si el usuario ya existe
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  // generateToken(user: any): string {
  //   const header = { alg: 'HS256', typ: 'JWT' };
  //   const sHeader = JSON.stringify(header);
  //   const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 8; // 60 segundos * 60 minutos * 8 horas
  //   const payloadWithExpiration = {
  //     ...user,
  //     exp: expirationTime,
  //   };

  //   const sPayload = JSON.stringify(payloadWithExpiration);
  //   const sKey = this.configService.get<string>('SECRET_KEY');
  //   if (!sKey) {
  //     throw new Error('Secret key is not defined');
  //   }
  //   return jsrsasign.jws.JWS.sign('HS256', sHeader, sPayload, sKey);
  // }

  generateToken(user: any): string {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    return user;
  }

  async findOneSlug(slug: string): Promise<User> {
    const user = await this.userModel.findOne({ slug });
    return user;
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<any> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña actual es incorrecta.');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return { message: 'Contraseña actualizada con éxito' };
  }
}
