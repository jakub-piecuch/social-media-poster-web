import { PostsException } from "./posts.exception";
import { Post } from "./types/Post";
import { CreatePostRequest, PostResponse } from "./types/PostDto";
import { PostEntity } from "./types/PostEntity";

export class PostsMapper {
  toDomain(entity: PostEntity): Post {
    return new Post({
      id: entity._id,
      content: entity.content,
      platform: entity.platform,
      group: {
        id: entity.group?._id,
        name: entity.group?.name
      },
      userId: entity.userId || undefined,
      submitted: entity.submitted,
      rejected: entity.rejected,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toDomainFromCreateRequest(request: CreatePostRequest): Post {
    return new Post({
      content: request.content,
      platform: request.platform,
      group: {
        id: request.group.id,
        name: request.group.name
      },
      userId: request.userId,
    });
  }

  toEntity(post: Post): PostEntity {
    return new PostEntity({
      _id: post.id,
      content: post.content,
      platform: post.platform,
      group: post.group ? {
        _id: post.group.id,
        name: post.group.name
      } : undefined,
      userId: post.userId,
      submitted: post.submitted || false,
      rejected: post.rejected || false,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    });
  }

  // mapCriteria(partialPost: Partial<Post>): Partial<PostEntity> {
  //   const criteria: Partial<PostEntity> = {};
    
  //   if (partialPost.platform) {
  //     criteria.platform = partialPost.platform;
  //   }
    
  //   if (partialPost.group && partialPost.group.id) {
  //     criteria['group._id'] = partialPost.group.id;
  //   }
    
  //   return criteria;
  // }

  toResponse(post: Post): PostResponse {
    if (!post.id || !post.createdAt || !post.updatedAt) {
      throw PostsException.internalServerError('Post does not contain all required fields for response mapping');
    }

    return {
      id: post.id,
      platform: post.platform,
      content: post.content,
      group: {
        id: post.group?.id || undefined,
        name: post.group?.name || undefined,
      },
      userId: post.userId || undefined,
      submitted: post.submitted ?? false,
      rejected: post.rejected ?? false,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}