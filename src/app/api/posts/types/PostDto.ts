import { PlatformEnum } from "@/app/types/GlobalEnum"

export interface PostResponse {
  id: string,
  platform: string,
  content: string,
  groupName?: string,
  userId?: string,
  submitted: boolean,
  underReview: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export interface CreatePostRequest {
  content: string,
  platform: PlatformEnum,
  groupName: string,
  userId: string
}