import { useQuery } from '@tanstack/react-query';
import { fetchPostsPublic, fetchPostsByEditorial, searchPosts, PostApi } from '@/services/dotnetApi';

export function usePosts() {
  return useQuery<PostApi[]>({
    queryKey: ['posts-public'],
    queryFn: fetchPostsPublic,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function usePostById(id: number) {
  return useQuery<PostApi | undefined>({
    queryKey: ['posts-public', 'single', id],
    queryFn: async () => {
      const posts = await fetchPostsPublic();
      return posts.find((p) => p.id === id);
    },
    enabled: id > 0,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useSearchPosts(query: string) {
  return useQuery<PostApi[]>({
    queryKey: ['posts-search', query],
    queryFn: () => searchPosts(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

export function usePostsByEditorial(editorialId: number) {
  return useQuery<PostApi[]>({
    queryKey: ['posts-editorial', editorialId],
    queryFn: () => fetchPostsByEditorial(editorialId),
    enabled: editorialId > 0,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

// Backward compat aliases
export const useArticles = usePosts;
