import { CreateGroupRequest, Group } from "./group.types";

// API functions
export const fetchGroups = async (): Promise<Group[]> => {
  const response = await fetch('/api/facebook/groups');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch groups');
  }
  return response.json();
};

export const fetchGroupById = async (id: string): Promise<Group> => {
  const response = await fetch(`/api/facebook/groups/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch group');
  }
  return response.json();
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
  
  return response.json();
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
  
  return response.json();
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
  
  return response.json();
};