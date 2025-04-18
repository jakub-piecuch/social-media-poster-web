// src/api/models/SocialMediaUserEntity.ts
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ISocialMediaUserEntity extends Document {
  _id: string
  username: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}

const SocialMediaUserEntitySchema = new Schema<ISocialMediaUserEntity>(
  {
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true },
    platform: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Create a compound index for userId and platform to ensure a user can only have one account per platform
SocialMediaUserEntitySchema.index({ username: 1, platform: 1 }, { unique: true });

export const SocialMediaUserEntity = mongoose.models.SocialMediaUserEntity ||
  mongoose.model<ISocialMediaUserEntity>('SocialMediaUserEntity', SocialMediaUserEntitySchema);