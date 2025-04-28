import { Post } from "../api/posts/types/Post";
import { CreatePostRequest } from "../api/posts/types/PostDto";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch posts');
  }
  console.log('posts json: ', response.json())
  return response.json();
};

export const createPost = async (groupData: CreatePostRequest): Promise<Post> => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create post');
  }
  
  return response.json();
};