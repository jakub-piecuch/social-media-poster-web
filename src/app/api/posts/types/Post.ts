export class Post {
  id: string;
  postId: string;
  content: string;
  groupId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.postId = post.id;
    this.content = post.content;
    this.groupId = post.groupId;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}