// Types for Facebook Groups
export interface Group {
  id: string;
  name: string;
  url: string;
  userIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGroupRequest {
  url: string;
  name: string;
  userIds: string[];
}