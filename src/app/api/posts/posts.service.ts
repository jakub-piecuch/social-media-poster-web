import { PostsException } from "./posts.exception";
import { PostsMapper } from "./posts.mapper";
import { PostsRepository } from "./posts.repository";
import { Post } from "./types/Post";

export class PostsService {
  private postsRepository: PostsRepository
  private mapper: PostsMapper;

  constructor() {
    this.postsRepository = new PostsRepository();
    this.mapper = new PostsMapper();
  }

  async createPost(post: Post): Promise<Post> {
    console.log('[INFO] Creating new Post with userId:', { userId: post.userId })

    const newEntity = this.mapper.toEntity(post);
    const savedPost = await this.postsRepository.save(newEntity);

    return this.mapper.toDomain(savedPost);
  }

  async findPostById(id: string): Promise<Post> {
    console.log('[INFO] Find post by id: ', id)

    const entity = await this.postsRepository.findById(id);

    if (!entity) {
      throw PostsException.notFound();
    }

    return this.mapper.toDomain(entity);
  }

  async findAllPostsByUserId(userId: string): Promise<Post[]> {
    console.log('[INFO] Find all posts by userId: ', userId)

    const entities = await this.postsRepository.findAllByUserId(userId);
    const posts = entities.map(post => this.mapper.toDomain(post))

    return posts;
  }

  async submitPostById(id: string): Promise<Post> {
    const updatedPost = await this.postsRepository.submitPostById(id);

    if (!updatedPost) {
      throw PostsException.notFound();
    }

    return this.mapper.toDomain(updatedPost);
  }
}