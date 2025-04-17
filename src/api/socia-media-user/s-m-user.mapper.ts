import { v4 as uuidv4 } from 'uuid';
import { ISocialMediaUserEntity } from '../socia-media-user/types/SocialMediaUserEntity';
import { SocialMediaUser } from '../socia-media-user/types/SocialMediaUser';

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
