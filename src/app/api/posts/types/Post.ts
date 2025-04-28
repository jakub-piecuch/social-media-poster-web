import { PlatformEnum } from "@/app/types/GlobalEnum";

export class Post {
  id?: string;
  content: string;
  platform: PlatformEnum; // this might be a list
  group?:{
    id?: string,
    name?: string
  };
  userId?: string;
  submitted?: boolean;
  underReview?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.platform = post.platform;
    this.content = post.content;
    this.group = { 
      id: post.group?.id, 
      name: post.group?.name  
    }
    this.userId = post.userId;
    this.submitted = post.submitted ?? false;
    this.underReview = post.underReview ?? false;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}