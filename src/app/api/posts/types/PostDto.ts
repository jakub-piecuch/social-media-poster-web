import { PlatformEnum } from "@/app/types/GlobalEnum"

export interface PostResponse {
  id: string,
  platform: string,
  content: string,
  group?: {
    id?: string,
    name?: string
  },
  userId?: string,
  submitted: boolean,
  rejected: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export interface CreatePostRequest {
  content: string,
  platform: PlatformEnum,
  group: {
    id: string,
    name: string
  },
  userId: string
}