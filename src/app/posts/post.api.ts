import { CreatePostRequest } from "../api/posts/types/PostDto";
import { Post } from "./post.types";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch posts');
  }
  
  // Parse the JSON once and store it in a variable
  const data = await response.json();
  console.log('posts data:', data);
  return data;
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