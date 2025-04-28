import { PlatformEnum } from "@/app/types/GlobalEnum";
import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface PostEntity extends Document {
  _id?: string;
  content: string;
  platform: PlatformEnum
  group?: {
    _id: string,
    name: string 
  };
  userId?: string;
  submitted: boolean;
  underReview: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PlatformEnumValues = Object.values(PlatformEnum);

const GroupSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true }
}, { _id: false }); 

const PostEntitySchema = new Schema<PostEntity>({
  _id: { type: String, default: uuidv4 },
  content: { type: String, required: true },
  platform: { type: String, enum: PlatformEnumValues, required: true},
  group: { 
    type: GroupSchema, 
    required: false
  },
  userId: { type: String, default: uuidv4 },
  submitted: { type: Boolean, required: true, default: false },
  underReview: { type: Boolean, required: true, default: false}
},
{
  timestamps: true
});

PostEntitySchema.index({ userId: 1 });
PostEntitySchema.index({ platform: 1 });
PostEntitySchema.index({ 'group._id': 1 });
PostEntitySchema.index({ submitted: 1 });

export const PostEntity = mongoose.models.PostEntity ||
  mongoose.model<PostEntity>('PostEntity', PostEntitySchema)