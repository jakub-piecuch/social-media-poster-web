// src/app/api/social-media-user/s-m-user.mapper.ts
import { v4 as uuidv4 } from 'uuid';
import { SocialMediaUser } from './types/SocialMediaUser';
import { SocialMediaUserEntity } from './types/SocialMediaUserEntity';
import { CreateSocialMediaUserRequest, SocialMediaUserResponse } from './types/SocialMediaUserDto';
import { SocialMediaUserException } from './s-m-user.exception';

export class SocialMediaUsersMapper {
  toDomain(entity: SocialMediaUserEntity): SocialMediaUser {
    return new SocialMediaUser({
      id: entity._id,
      username: entity.username,
      platform: entity.platform,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toDomainFromCreateRequest(request: CreateSocialMediaUserRequest): SocialMediaUser {
    return new SocialMediaUser({
      username: request.username,
      platform: request.platform,
    })
  }

  toEntity(domain: SocialMediaUser): SocialMediaUserEntity {
    return new SocialMediaUserEntity({
      id: domain.id,
      username: domain.username,
      platform: domain.platform,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt
    })
  }

  toResponse(socialMediaUser: SocialMediaUser): SocialMediaUserResponse {
    if (!socialMediaUser.id || !socialMediaUser.createdAt || !socialMediaUser.updatedAt) {
      throw SocialMediaUserException.internalServerError('S-M-User does not contain all required fields for response mapping');
    }

    return {
      id: socialMediaUser.id,
      username: socialMediaUser.username,
      platform: socialMediaUser.platform,
      createdAt: socialMediaUser.createdAt,
      updatedAt: socialMediaUser.updatedAt,
    }
  }
}