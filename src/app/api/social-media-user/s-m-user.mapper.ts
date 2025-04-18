import { v4 as uuidv4 } from 'uuid';
import { SocialMediaUser } from './types/SocialMediaUser';
import { ISocialMediaUserEntity } from './types/SocialMediaUserEntity';

export class SocialMediaMapper {
  static toDomain(entity: ISocialMediaUserEntity): SocialMediaUser {
    return new SocialMediaUser({
      id: entity._id,
      username: entity.username,
      platform: entity.platform,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    });
  }

  static toEntity(domain: SocialMediaUser): Partial<ISocialMediaUserEntity> {
    const isNew = !domain.id || domain.id === '';

  return {
    _id: domain.id || uuidv4(),
    username: domain.username,
    platform: domain.platform,
    createdAt: domain.createdAt,
    updatedAt: domain.updatedAt
    };
  }
}
