import { Injectable, NotFoundException } from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }
}
