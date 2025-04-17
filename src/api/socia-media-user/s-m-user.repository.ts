// src/api/repositories/SocialMediaUserRepository.ts
import mongoose from 'mongoose';
import { SocialMediaUser } from './types/SocialMediaUser';
import { SocialMediaMapper } from './s-m-user.mapper';
import { SocialMediaUserEntity } from './types/SocialMediaUserEntity';
import { connectToDatabase } from '@/lib/mongoose';

export class SocialMediaUserRepository {

  async save(socialMedia: SocialMediaUser): Promise<SocialMediaUser> {
    await connectToDatabase();

    const entity = SocialMediaMapper.toEntity(socialMedia);

    console.log('[DEBUG] Searching for socialMediaUser:', { _id: entity._id, platform: entity.platform });
    const existingEntity = await SocialMediaUserEntity.findOne({
      _id: entity._id,
      platform: entity.platform
    });

    if (existingEntity) {
      // Update existing record
      Object.assign(existingEntity, entity);
      const savedEntity = await existingEntity.save();
      return SocialMediaMapper.toDomain(savedEntity);
    } else {
      // Create new record
      const newEntity = new SocialMediaUserEntity(entity);
      const savedEntity = await newEntity.save();
      return SocialMediaMapper.toDomain(savedEntity);
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
    return entities.map(entity => SocialMediaMapper.toDomain(entity));
  }


  async findById(id: string | mongoose.Types.ObjectId): Promise<SocialMediaUser | null> {
    const entity = await SocialMediaUserEntity.findById(id);
    return entity ? SocialMediaMapper.toDomain(entity) : null;
  }

  
  async findByid(id: string): Promise<SocialMediaUser[]> {
    const entities = await SocialMediaUserEntity.find({ id });
    return entities.map(entity => SocialMediaMapper.toDomain(entity));
  }

  async findByidAndPlatform(id: string, platform: string): Promise<SocialMediaUser | null> {
    const entity = await SocialMediaUserEntity.findOne({ id, platform });
    return entity ? SocialMediaMapper.toDomain(entity) : null;
  }

  async findByPlatform(platform: string): Promise<SocialMediaUser[]> {
    const entities = await SocialMediaUserEntity.find({ platform });
    return entities.map(entity => SocialMediaMapper.toDomain(entity));
  }

  
  async findActive(): Promise<SocialMediaUser[]> {
    const entities = await SocialMediaUserEntity.find({
      $or: [
        { tokenExpiry: { $gt: new Date() } },
        { tokenExpiry: null }
      ]
    });
    return entities.map(entity => SocialMediaMapper.toDomain(entity));
  }

  async deleteById(id: string | mongoose.Types.ObjectId): Promise<boolean> {
    const result = await SocialMediaUserEntity.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  async deleteByidAndPlatform(id: string, platform: string): Promise<boolean> {
    const result = await SocialMediaUserEntity.deleteOne({ id, platform });
    return result.deletedCount === 1;
  }


  async deleteByid(id: string): Promise<number> {
    const result = await SocialMediaUserEntity.deleteMany({ id });
    return result.deletedCount;
  }

  async count(): Promise<number> {
    return await SocialMediaUserEntity.countDocuments();
  }

  
  async countByid(id: string): Promise<number> {
    return await SocialMediaUserEntity.countDocuments({ id });
  }

  async countByPlatform(platform: string): Promise<number> {
    return await SocialMediaUserEntity.countDocuments({ platform });
  }
}