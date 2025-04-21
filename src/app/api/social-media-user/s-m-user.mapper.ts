// src/app/api/social-media-user/s-m-user.mapper.ts
import { v4 as uuidv4 } from 'uuid';
import { SocialMediaUser } from './types/SocialMediaUser';
import { SocialMediaUserEntity } from './types/SocialMediaUserEntity';
import { FacebookApiData } from './types/FacebookApiData';

export class SocialMediaMapper {
  static toDomain(entity: SocialMediaUserEntity): SocialMediaUser {
    return new SocialMediaUser({
      id: entity._id,
      username: entity.username,
      platform: entity.platform,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      facebookAuth: entity.facebookAuth as FacebookApiData | undefined
    });
  }

  static toEntity(domain: SocialMediaUser): Partial<SocialMediaUserEntity> {
    const isNew = !domain.id || domain.id === '';

    return {
      _id: domain.id || uuidv4(),
      username: domain.username,
      platform: domain.platform,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      facebookAuth: domain.facebookAuth
    };
  }
}