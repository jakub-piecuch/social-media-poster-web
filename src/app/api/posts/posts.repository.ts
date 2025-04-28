import { Post } from "./types/Post";
import { PostsMapper } from "./posts.mapper";
import { PostEntity } from "./types/PostEntity";

export class PostsRepository {

  constructor() {
  }

  async save(entity: PostEntity): Promise<PostEntity> {
    return await PostEntity.create(entity);
  }

  async findById(id: string): Promise<PostEntity | null> {
    return await PostEntity.findOne({ _id: id });
  }

  async findPostsByCriteria() {
    return await PostEntity.find();
  }

  async findAllByUserId(userId: string): Promise<PostEntity[]> {
    return await PostEntity.find({ userId: userId });
  }

  async submitPostById(id: string): Promise<PostEntity | null> {
    const updatedPost = await PostEntity.findOneAndUpdate(
      { _id: id },
      { $set: { submitted: true }},
      { new: true, runValidators: true}
    );

    return updatedPost
  }
}