import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export interface GroupEntity extends Document {
  _id?: string;
  url: string;
  userIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const GroupEntitySchema = new Schema<GroupEntity>({
  _id: { type: String, default: uuidv4 },
  url: { type: String, required: true },
  userIds: [{ type: String, required: true }],
},
{
  timestamps: true
})

export const GroupEntity = mongoose.models.GroupEntity ||
  mongoose.model<GroupEntity>('GroupEntity', GroupEntitySchema)