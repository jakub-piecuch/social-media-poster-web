// src/api/models/SocialMediaUserEntity.ts
import { PlatformEnum } from '@/app/types/GlobalEnum';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface SocialMediaUserEntity extends Document {
  _id?: string;
  username: string;
  platform: PlatformEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

const PlatformEnumValues = Object.values(PlatformEnum);

const SocialMediaUserEntitySchema = new Schema<SocialMediaUserEntity>({
  _id: { type: String, default: uuidv4 },
  username: { type: String, required: true },
  platform: { type: String, enum: PlatformEnumValues, required: true },
},
{
  timestamps: true
});

SocialMediaUserEntitySchema.index({
  username: 1,
  platform: 1
},
  {
    unique: true,
    partialFilterExpression: {
      platform: { $ne: 'facebook' }
    }
  });

export const SocialMediaUserEntity = mongoose.models.SocialMediaUserEntity ||
  mongoose.model<SocialMediaUserEntity>('SocialMediaUserEntity', SocialMediaUserEntitySchema);