import { PlatformEnum } from "../types/GlobalEnum";

export interface Post {
  id?: string;
  content: string;
  platform: PlatformEnum; // this might be a list
  groupName?: string,
  userId?: string;
  submitted?: boolean;
  underReview?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}