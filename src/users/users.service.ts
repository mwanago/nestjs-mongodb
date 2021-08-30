import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).populate({
      path: 'posts',
      populate: {
        path: 'categories',
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id).populate({
      path: 'posts',
      populate: {
        path: 'categories',
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    await createdUser
      .populate({
        path: 'posts',
        populate: {
          path: 'categories',
        },
      })
      .execPopulate();
    return createdUser.save();
  }
}
