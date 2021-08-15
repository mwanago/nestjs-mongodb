import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import CreatePostDto from './dto/createPost.dto';

@Injectable()
class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(postData: CreatePostDto) {
    const createdCat = new this.postModel(postData);
    return createdCat.save();
  }

  async findAll() {
    return this.postModel.find().exec();
  }
}

export default PostsService;
