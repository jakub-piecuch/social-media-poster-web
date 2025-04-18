import { SocialMediaUserRepository } from "./s-m-user.repository";
import { SocialMediaUser } from "./types/SocialMediaUser";

export class SocialMediaUserService {
  private repository: SocialMediaUserRepository;

  constructor() {
    this.repository = new SocialMediaUserRepository();
  }

  async createSocialMediaUser(userData: Omit<SocialMediaUser, 'id'>): Promise<SocialMediaUser> {
    console.log(`Creating user from userData ${userData}`)

    const newUser = new SocialMediaUser({
      id: '',
      username: userData.username,
      platform: userData.platform,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedUser = this.repository.save(newUser)

    return savedUser
  }

  async updateSocialMediaUser(id: string, userData: Partial<SocialMediaUser>): Promise<SocialMediaUser | null> {
    const existingUser = await this.repository.findById(id);
    
    if (!existingUser) {
      return null;
    }

    // Update the user properties
    const updatedUser = new SocialMediaUser({
      ...existingUser,
      ...userData,
      id: existingUser.id, // Ensure we don't override the ID
      updatedAt: new Date() // Update the updatedAt timestamp
    });

    // Save the updated user
    return this.repository.save(updatedUser);
  }

  async findSocialMediaUserById(id: string): Promise<SocialMediaUser | null> {
    return this.repository.findById(id);
  }
}