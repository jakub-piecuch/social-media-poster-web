import { SocialMediaUserEntity } from "./types/SocialMediaUserEntity";

export class SocialMediaUserRepository {
  constructor() {
  }

  async save(entity: SocialMediaUserEntity): Promise<SocialMediaUserEntity> {
    try {
      return await SocialMediaUserEntity.create(entity);
    } catch (err) {
      console.error('SocialMediaUserRepository save error:', err);
      throw err;
    }
  }

  async findById(id: string): Promise<SocialMediaUserEntity | null> {
    return await SocialMediaUserEntity.findOne({ _id: id });
  }

  async findAll(): Promise<SocialMediaUserEntity[]> {
    return await SocialMediaUserEntity.find();
  }
}