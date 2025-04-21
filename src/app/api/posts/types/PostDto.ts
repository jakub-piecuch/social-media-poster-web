import { PlatformEnum } from "@/app/types/GlobalEnum"

export interface PostResponse {
  id: string,
  content: string,
  postId: string,
  groupId: string,
  userId: string,
  submitted: boolean,
  underReview: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export interface CreatePostRequest {
  content: string,
  platform: PlatformEnum,
  groupId: string,
  userId: string
}