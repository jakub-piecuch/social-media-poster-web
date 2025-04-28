import { CreateGroupRequest, Group } from "./group.types";

// API functions
export const fetchGroups = async (): Promise<Group[]> => {
  const response = await fetch('/api/facebook/groups');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch groups');
  }
  
  // Parse the JSON once and store it in a variable
  const data = await response.json();
  return data;
};

export const fetchGroupById = async (id: string): Promise<Group> => {
  const response = await fetch(`/api/facebook/groups/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch group');
  }
  
  // Parse the JSON once
  return await response.json();
};

export const createGroup = async (groupData: CreateGroupRequest): Promise<Group> => {
  const response = await fetch('/api/facebook/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create group');
  }
  
  return await response.json();
};

export const updateGroupUrl = async ({ id, url }: { id: string; url: string }): Promise<Group> => {
  const response = await fetch(`/api/facebook/groups/${id}/update-url`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update group URL');
  }
  
  return await response.json();
};

export const addUserToGroup = async ({ id, userId }: { id: string; userId: string }): Promise<Group> => {
  const response = await fetch(`/api/facebook/groups/${id}/add-userId`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add user to group');
  }
  
  return await response.json();
};