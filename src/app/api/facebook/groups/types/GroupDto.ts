export interface GroupResponse {
  id: string,
  name: string,
  facebookId: string,
  userIds: string[],
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGroupRequest {
  name: string,
  facebookId: string,
  userIds: string[]
}