import { Post } from "./types/Post";
import { CreatePostRequest, PostResponse } from "./types/PostDto";
import { PostEntity } from "./types/PostEntity";
import { PostsException } from "./posts.exception";

export class PostsMapper {
  toDomain(entity: PostEntity): Post {
    return new Post({
      id: entity._id,
      content: entity.content,
      platform: entity.platform,
      postId: entity.postId,
      groupId: entity.groupId,
      userId: entity.userId,
      submitted: entity.submitted,
      underReview: entity.underReview,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toDomainFromCreateRequest(request: CreatePostRequest): Post {
    return new Post({
      content: request.content,
      platform: request.platform,
      groupId: request.groupId,
      userId: request.userId,
    });
  }

  toEntity(post: Post): PostEntity {
    return new PostEntity({
      _id: post.id,
      content: post.content,
      platform: post.platform,
      postId: post.postId,
      groupId: post.groupId,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    })
  }

  toResponse(post: Post): PostResponse {
    if (!post.id || !post.postId || !post.createdAt || !post.updatedAt) {
      throw PostsException.internalServerError('Post does not contain all required fields for response mapping')
    }

    return {
      id: post.id,
      content: post.content,
      postId: post.postId,
      groupId: post.groupId,
      userId: post.userId,
      submitted: post.submitted ?? false,
      underReview: post.underReview ?? false,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
