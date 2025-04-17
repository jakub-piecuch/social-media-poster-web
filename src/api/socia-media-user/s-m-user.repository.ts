// src/api/repositories/SocialMediaUserRepository.ts
import mongoose from 'mongoose';
import { SocialMediaUser } from './types/SocialMediaUser';
import { SocialMediaMapper } from './s-m-user.mapper';
import { SocialMediaUserEntity } from './types/SocialMediaUserEntity';
import { connectToDatabase } from '@/lib/mongoose';

export class SocialMediaUserRepository {
  /**
   * Save a social media user to the database
   * @param socialMedia The social media domain object to save
   * @returns The saved social media user domain object
   */
  async save(socialMedia: SocialMediaUser): Promise<SocialMediaUser> {
    await connectToDatabase();

    const entity = SocialMediaMapper.toEntity(socialMedia);
    
    // if (!entity._id) {
    //   throw new Error('[ERROR][Repository] Entity._id is missing or invalid');
    // }

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

  /**
   * Find all social media user accounts
   * @param limit Optional limit on number of results
   * @param skip Optional number of records to skip (for pagination)
   * @returns Array of social media user domain objects
   */
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

  /**
   * Find a social media user account by its MongoDB ID
   * @param id The MongoDB ID
   * @returns The social media user domain object or null if not found
   */
  async findById(id: string | mongoose.Types.ObjectId): Promise<SocialMediaUser | null> {
    const entity = await SocialMediaUserEntity.findById(id);
    return entity ? SocialMediaMapper.toDomain(entity) : null;
  }

  /**
   * Find all social media accounts for a specific user
   * @param id The user ID
   * @returns Array of social media user domain objects
   */
  async findByid(id: string): Promise<SocialMediaUser[]> {
    const entities = await SocialMediaUserEntity.find({ id });
    return entities.map(entity => SocialMediaMapper.toDomain(entity));
  }

  /**
   * Find a specific social media account for a user on a specific platform
   * @param id The user ID
   * @param platform The social media platform
   * @returns The social media user domain object or null if not found
   */
  async findByidAndPlatform(id: string, platform: string): Promise<SocialMediaUser | null> {
    const entity = await SocialMediaUserEntity.findOne({ id, platform });
    return entity ? SocialMediaMapper.toDomain(entity) : null;
  }

  /**
   * Find all social media accounts for a specific platform
   * @param platform The social media platform
   * @returns Array of social media user domain objects
   */
  async findByPlatform(platform: string): Promise<SocialMediaUser[]> {
    const entities = await SocialMediaUserEntity.find({ platform });
    return entities.map(entity => SocialMediaMapper.toDomain(entity));
  }

  /**
   * Find all valid (non-expired) social media accounts
   * @returns Array of social media user domain objects with valid tokens
   */
  async findActive(): Promise<SocialMediaUser[]> {
    const entities = await SocialMediaUserEntity.find({
      $or: [
        { tokenExpiry: { $gt: new Date() } },
        { tokenExpiry: null }
      ]
    });
    return entities.map(entity => SocialMediaMapper.toDomain(entity));
  }

  /**
   * Delete a social media user account by its MongoDB ID
   * @param id The MongoDB ID
   * @returns True if deleted, false if not found
   */
  async deleteById(id: string | mongoose.Types.ObjectId): Promise<boolean> {
    const result = await SocialMediaUserEntity.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  /**
   * Delete a specific social media account for a user on a specific platform
   * @param id The user ID
   * @param platform The social media platform
   * @returns True if deleted, false if not found
   */
  async deleteByidAndPlatform(id: string, platform: string): Promise<boolean> {
    const result = await SocialMediaUserEntity.deleteOne({ id, platform });
    return result.deletedCount === 1;
  }

  /**
   * Delete all social media accounts for a specific user
   * @param id The user ID
   * @returns Number of records deleted
   */
  async deleteByid(id: string): Promise<number> {
    const result = await SocialMediaUserEntity.deleteMany({ id });
    return result.deletedCount;
  }

  /**
   * Count the total number of social media user accounts
   * @returns The total count
   */
  async count(): Promise<number> {
    return await SocialMediaUserEntity.countDocuments();
  }

  /**
   * Count the number of social media accounts for a specific user
   * @param id The user ID
   * @returns The count for this user
   */
  async countByid(id: string): Promise<number> {
    return await SocialMediaUserEntity.countDocuments({ id });
  }

  /**
   * Count the number of accounts for a specific platform
   * @param platform The social media platform
   * @returns The count for this platform
   */
  async countByPlatform(platform: string): Promise<number> {
    return await SocialMediaUserEntity.countDocuments({ platform });
  }
}