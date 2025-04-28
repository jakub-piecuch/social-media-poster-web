export interface GroupResponse {
  id: string,
  name: string,
  url: string,
  userIds: string[],
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGroupRequest {
  name: string,
  url: string,
  userIds: string[]
}