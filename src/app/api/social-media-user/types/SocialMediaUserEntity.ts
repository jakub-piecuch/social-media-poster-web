// src/api/models/SocialMediaUserEntity.ts
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const FacebookAuthSchema = new Schema({
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  expiresAt: { type: Date, required: true },
  scopes: { type: [String], required: true },
  facebookUserId: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false });

export interface SocialMediaUserEntity extends Document {
  _id: string
  username: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
  facebookAuth?: {
    accessToken: string;
    refreshToken?: string;
    expiresAt: Date;
    scopes: string[];
    facebookUserId: string;
    isActive: boolean;
  };
}

const SocialMediaUserEntitySchema = new Schema<SocialMediaUserEntity>(
  {
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true },
    platform: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    facebookAuth: FacebookAuthSchema
  },
  { timestamps: true }
);

// Create a compound index for userId and platform to ensure a user can only have one account per platform
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

SocialMediaUserEntitySchema.index(
  {
    'facebookAuth.facebookUserId': 1
  },
  {
    unique: true,
    sparse: true // Only index documents that have facebookAuth.facebookUserId
  }
);

export const SocialMediaUserEntity = mongoose.models.SocialMediaUserEntity ||
  mongoose.model<SocialMediaUserEntity>('SocialMediaUserEntity', SocialMediaUserEntitySchema);