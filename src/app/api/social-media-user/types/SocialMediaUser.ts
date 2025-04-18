
export class SocialMediaUser {
  id: string;
  username: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
  
  constructor(socialMediaUser: SocialMediaUser) {
    this.id = socialMediaUser.id;
    this.username = socialMediaUser.username;
    this.platform = socialMediaUser.platform;
    this.createdAt = socialMediaUser.createdAt;
    this.updatedAt = socialMediaUser.updatedAt;
  }
}