import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSocialMediaUser, fetchSocialMediaUsers } from "./s-m-u.api";

export function useSocialMediaUsers() {
  const query = useQuery({
    queryKey: ['social-media-users'],
    queryFn: fetchSocialMediaUsers,
  });
  
  console.log('Social-media-users query state:', {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  });
  
  return query;
}

// export function useGroup(id: string) {
//   return useQuery({
//     queryKey: ['facebook-group', id],
//     queryFn: () => fetchGroupById(id),
//     enabled: !!id, // Only run query if id is provided
//   });
// }

export function useCreateSocialMediaUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSocialMediaUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-media-users'] });
    },
    onError: (error: Error) => {
    },
  });
}