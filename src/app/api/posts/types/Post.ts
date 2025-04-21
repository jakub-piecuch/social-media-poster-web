import { PlatformEnum } from "@/app/types/GlobalEnum";

export class Post {
  id?: string;
  content: string;
  platform: PlatformEnum;
  postId?: string;
  groupId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.platform = post.platform;
    this.content = post.content;
    this.postId = post.id;
    this.groupId = post.groupId;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}