
export class Group {
  id?: string;
  name: string;
  url: string;
  userIds: string[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(post: Group) {
    this.id = post.id;
    this.name = post.name;
    this.url = post.url;
    this.userIds = post.userIds;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}