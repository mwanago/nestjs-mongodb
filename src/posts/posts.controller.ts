import { Body, Controller, Get, Post } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.findAll();
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }
}
