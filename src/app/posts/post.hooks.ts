import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from '../../hooks/useToast';
import { createPost, fetchPosts } from "./post.api";

export function usePosts() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  console.log('Posts query state:', {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  });
  
  return query;
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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