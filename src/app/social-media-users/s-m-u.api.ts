import { CreateSocialMediaUser, SocialMediaUser } from "./s-m-u.types";

export const fetchSocialMediaUsers = async (): Promise<SocialMediaUser[]> => {
  const response = await fetch('/api/social-media-users');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch social-media-users');
  }
  
  // Parse the JSON once and store it in a variable
  const data = await response.json();
  console.log('socialMediaUsers data:', data);
  return data;
};

export const createSocialMediaUser = async (groupData: CreateSocialMediaUser): Promise<SocialMediaUser> => {
  const response = await fetch('/api/social-media-users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create social-media-user');
  }
  
  return response.json();
};