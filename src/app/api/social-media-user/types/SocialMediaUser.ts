import { FacebookApiData } from "./FacebookApiData";

export class SocialMediaUser {
  id: string;
  username: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
  facebookAuth?: FacebookApiData; // Optional Facebook auth data
  
  constructor(socialMediaUser: SocialMediaUser) {
    this.id = socialMediaUser.id;
    this.username = socialMediaUser.username;
    this.platform = socialMediaUser.platform;
    this.createdAt = socialMediaUser.createdAt;
    this.updatedAt = socialMediaUser.updatedAt;
    this.facebookAuth = socialMediaUser.facebookAuth;
  }
}