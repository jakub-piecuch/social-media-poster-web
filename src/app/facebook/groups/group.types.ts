// Types for Facebook Groups
export interface Group {
  id: string;
  name: string;
  facebookId: string;
  userIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGroupRequest {
  facebookId: string;
  name: string;
  userIds: string[];
}