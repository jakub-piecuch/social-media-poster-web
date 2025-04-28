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
      { $set: { submitted: true, rejected: false  }},
      { new: true, runValidators: true}
    );

    return updatedPost
  }

  async rejectPostById(id: string): Promise<PostEntity | null> {
    const updatedPost = await PostEntity.findOneAndUpdate(
      { _id: id },
      { $set: { submitted: false, rejected: true }},
      { new: true, runValidators: true}
    );

    return updatedPost
  }

  async updatePost(entity: PostEntity): Promise<PostEntity | null> {
    // Ensure the entity has an _id
    if (!entity._id) {
      throw new Error("Cannot update a post without an ID");
    }

    // Update only the content field to prevent overwriting other fields
    const updatedPost = await PostEntity.findOneAndUpdate(
      { _id: entity._id },
      { 
        $set: { 
          content: entity.content,
          // Update the timestamp
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    return updatedPost;
  }
}