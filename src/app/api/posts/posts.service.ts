import { PostsException } from "./posts.exception";
import { PostsMapper } from "./posts.mapper";
import { PostsRepository } from "./posts.repository";
import { Post } from "./types/Post";

export class PostsService {
  private postsRepository: PostsRepository

  constructor() {
    this.postsRepository = new PostsRepository();
  }

  async createPost(post: Post): Promise<Post> {
    console.log('[INFO] Creating new Post with userId:', { userId: post.userId })

    const savedPost = await this.postsRepository.save(post);

    return savedPost;
  }

  async findPostById(id: string): Promise<Post> {
    console.log('[INFO] Find post by id: ', id)

    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw PostsException.notFound();
    }

    return post;
  }

  async findAllPostsByUserId(userId: string): Promise<Post[]> {
    console.log('[INFO] Find all posts by userId: ', userId)

    const posts = await this.postsRepository.findAllByUserId(userId);

    return posts;
  }

  async submitPostById(id: string): Promise<void> {
    const post = await this.findPostById(id);

    const postToUpdate = {
      ...post,
      submitted: true
    }

    await this.postsRepository.updatePost(postToUpdate);
  }
}