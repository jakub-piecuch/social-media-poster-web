import { PlatformEnum } from "@/app/types/GlobalEnum";
import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export interface PostEntity extends Document {
  _id?: string;
  content: string;
  platform: PlatformEnum
  postId: string;
  groupId: string;
  userId: string;
  submitted: boolean;
  underReview: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PlatformEnumValues = Object.values(PlatformEnum);

const PostEntitySchema = new Schema<PostEntity>({
  _id: { type: String, default: uuidv4 },
  content: { type: String, required: true },
  platform: { type: String, enum: PlatformEnumValues, required: true},
  postId: { type: String, default: uuidv4 },
  groupId: { type: String, default: uuidv4 },
  userId: { type: String, default: uuidv4 },
  submitted: { type: Boolean, required: true, default: false },
  underReview: { type: Boolean, required: true, default: false}
},
{
  timestamps: true
});

export const PostEntity = mongoose.models.PostEntity ||
  mongoose.model<PostEntity>('PostEntity', PostEntitySchema)