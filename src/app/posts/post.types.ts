import { PlatformEnum } from "../types/GlobalEnum";

export interface Post {
  id?: string;
  content: string;
  platform: PlatformEnum; // this might be a list
  group?: {
    id: string
    name: string
  },
  userId?: string;
  submitted: boolean;
  rejected: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}