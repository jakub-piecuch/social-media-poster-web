import { PlatformEnum } from "@/app/types/GlobalEnum";

export class SocialMediaUser {
  id?: string;
  username: string;
  platform: PlatformEnum;
  createdAt?: Date;
  updatedAt?: Date;
  
  constructor(socialMediaUser: SocialMediaUser) {
    this.id = socialMediaUser.id;
    this.username = socialMediaUser.username;
    this.platform = socialMediaUser.platform;
    this.createdAt = socialMediaUser.createdAt;
    this.updatedAt = socialMediaUser.updatedAt;
  }
}