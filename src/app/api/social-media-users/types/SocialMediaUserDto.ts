import { PlatformEnum } from "@/app/types/GlobalEnum";

export interface SocialMediaUserResponse {
  id: string,
  username: string,
  platform: PlatformEnum,
  createdAt: Date,
  updatedAt: Date
}

export interface CreateSocialMediaUserRequest {
  username: string,
  platform: PlatformEnum
}