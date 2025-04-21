import { Post } from "./types/Post";
import { PostResponse } from "./types/PostDto";
import { PostEntity } from "./types/PostEntity";

export class PostsMapper {
  static toDomain(entity: PostEntity): Post {
    return new Post({
      id: entity._id,
      postId: entity.postId,
      content: entity.content,
      groupId: entity.groupId,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(post: Post): PostEntity {
    return new PostEntity({

    })
  }

  static toResponse(post: Post): PostResponse {
    return {
      
    };
  }
}