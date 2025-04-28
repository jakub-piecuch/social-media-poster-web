'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '../../../hooks/useToast';
import { addUserToGroup, createGroup, fetchGroupById, fetchGroups, updateGroupUrl } from './group.api';

// Hooks
export function useGroups() {
  const query = useQuery({
    queryKey: ['facebook-groups'],
    queryFn: fetchGroups,
  });
  
  console.log('Groups query state:', {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  });
  
  return query;
}

export function useGroup(id: string) {
  return useQuery({
    queryKey: ['facebook-group', id],
    queryFn: () => fetchGroupById(id),
    enabled: !!id, // Only run query if id is provided
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facebook-groups'] });
      toast.success('Udalo sie!!')
      // toast({
      //   title: 'Success',
      //   description: 'Group created successfully',
      // });
    },
    onError: (error: Error) => {
      // toast({
      //   title: 'Error',
      //   description: error.message,
      //   variant: 'destructive',
      // });
    },
  });
}

export function useUpdateGroupUrl() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateGroupUrl,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['facebook-groups'] });
      queryClient.invalidateQueries({ queryKey: ['facebook-group', data.id] });
      // toast({
      //   title: 'Success',
      //   description: 'Group URL updated successfully',
      // });
    },
    onError: (error: Error) => {
      // toast({
      //   title: 'Error',
      //   description: error.message,
      //   variant: 'destructive',
      // });
    },
  });
}

export function useAddUserToGroup() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addUserToGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['facebook-groups'] });
      queryClient.invalidateQueries({ queryKey: ['facebook-group', data.id] });
      // toast({
      //   title: 'Success',
      //   description: 'User added to group successfully',
      // });
    },
    onError: (error: Error) => {
      // toast({
      //   title: 'Error',
      //   description: error.message,
      //   variant: 'destructive',
      // });
    },
  });
}