export interface PostResponse {
  id: string,
  postId: string,
  content: string,
  groupId: string,
  userId: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface CreatePostRequest {
  content: string,
  groupId: string,
  userId: string
}