// src/api/repositories/SocialMediaUserRepository.ts
import mongoose from 'mongoose';
import { SocialMediaUser } from './types/SocialMediaUser';
import { SocialMediaUsersMapper } from './s-m-user.mapper';
import { SocialMediaUserEntity } from './types/SocialMediaUserEntity';
import { connectToDatabase } from '@/lib/mongoose';
import { SocialMediaUserException } from './s-m-user.exception';

export class SocialMediaUserRepository {

  async save(socialMedia: SocialMediaUser): Promise<SocialMediaUser> {
    await connectToDatabase();

    const entity = SocialMediaUsersMapper.toEntity(socialMedia);

    console.log('[DEBUG] Searching for socialMediaUser:', { _id: entity._id, platform: entity.platform });
    const existingEntity = await SocialMediaUserEntity.findOne({
      username: entity.username,
      platform: entity.platform
    });

    if (existingEntity) {
     throw SocialMediaUserException.userAlreadyExists();
    } else {
      // Create new record
      const newEntity = new SocialMediaUserEntity(entity);
      const savedEntity = await newEntity.save();
      return SocialMediaUsersMapper.toDomain(savedEntity);
    }
  }

  async findAll(limit?: number, skip?: number): Promise<SocialMediaUser[]> {
    const query = SocialMediaUserEntity.find();
    
    if (skip !== undefined) {
      query.skip(skip);
    }
    
    if (limit !== undefined) {
      query.limit(limit);
    }
    
    const entities = await query.exec();
    return entities.map(entity => SocialMediaUsersMapper.toDomain(entity));
  }

  async findByQuery(query: any, limit?: number, skip?: number): Promise<SocialMediaUser[]> {
    await connectToDatabase();
    
    const queryBuilder = SocialMediaUserEntity.find(query);
    
    if (skip !== undefined) {
      queryBuilder.skip(skip);
    }
    
    if (limit !== undefined) {
      queryBuilder.limit(limit);
    }
    
    const entities = await queryBuilder.exec();
    return entities.map(entity => SocialMediaUsersMapper.toDomain(entity));
  }


  async findById(id: string | mongoose.Types.ObjectId): Promise<SocialMediaUser | null> {
    const entity = await SocialMediaUserEntity.findById(id);
    return entity ? SocialMediaUsersMapper.toDomain(entity) : null;
  }


  async deleteById(id: string | mongoose.Types.ObjectId): Promise<boolean> {
    const result = await SocialMediaUserEntity.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}