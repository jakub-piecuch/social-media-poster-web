export interface GroupResponse {
  id: string,
  url: string,
  userIds: string[],
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGroupRequest {
  url: string,
  userIds: string[]
}