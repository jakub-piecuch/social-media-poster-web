import { useQuery } from "@tanstack/react-query";

interface SocialMediaUser {
  id: string;
  username: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}

async function fetchSocialMediaUsers(): Promise<SocialMediaUser[]> {
  const response = await fetch('/api/social-media-user');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch social media users');
  }
  
  return response.json();
}

export function useSocialMediaUsers() {
  return useQuery({
    queryKey: ['social-media-users'],
    queryFn: fetchSocialMediaUsers,
  });
}