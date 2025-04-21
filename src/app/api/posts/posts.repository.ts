import { Post } from "./types/Post";
import { PostsMapper } from "./posts.mapper";
import { PostEntity } from "./types/PostEntity";

export class PostsRepository {
  private mapper: PostsMapper;

  constructor() {
    this.mapper = new PostsMapper();
  }

  async save(post: Post): Promise<Post> {
    const entity = this.mapper.toEntity(post);

    const savedEntity = await PostEntity.create(entity);

    return this.mapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<Post | null> {
    const entity = await PostEntity.findOne({ id: id });
    return this.mapper.toDomain(entity);
  }

  async findAllByUserId(userId: string): Promise<Post[]> {
    const entities = await PostEntity.find({ userId: userId });
    return entities.map(post => this.mapper.toDomain(post))
  }
}