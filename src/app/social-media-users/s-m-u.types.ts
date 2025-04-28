import { PlatformEnum } from "../types/GlobalEnum";

export interface SocialMediaUser{
  id: string,
  username: string,
  platform: PlatformEnum,
  createdAt: Date,
  updatedAt: Date,
}

export interface CreateSocialMediaUser{
  username: string,
  platform: PlatformEnum
}