import { platform } from "os";
import { SocialMediaUserRepository } from "./s-m-user.repository";
import { SocialMediaUser } from "./types/SocialMediaUser";
import { useReducer } from "react";
import { SocialMediaUsersMapper } from "./s-m-user.mapper";

export class SocialMediaUserService {
  private repository: SocialMediaUserRepository;
  private mapper: SocialMediaUsersMapper;

  constructor() {
    this.repository = new SocialMediaUserRepository();
    this.mapper = new SocialMediaUsersMapper();
  }

  async createSocialMediaUser(userData: SocialMediaUser): Promise<SocialMediaUser> {
    console.log('[INFO] Creating new s-m-user with username and platform :', { username: userData.username, platform: userData.platform })

    const newEntity = this.mapper.toEntity(userData)
    const savedUser = await this.repository.save(newEntity)

    return savedUser
  }

  async fetchAllSocialMediaUsers(): Promise<SocialMediaUser[]> {
    console.log('[INFO] Fetching socialMediaUsers by criteria: ')

    const entities = await this.repository.findAll()

    return entities.map(entity => this.mapper.toDomain(entity))
  }
}