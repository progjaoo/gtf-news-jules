import { useQuery } from '@tanstack/react-query';
import { fetchPostsPublic, fetchPostsByEditorial, searchPosts, fetchPostBySlug, fetchFilteredPosts, PostApi } from '@/services/dotnetApi';

export function usePosts() {
  return useQuery<PostApi[]>({
    queryKey: ['posts-public'],
    queryFn: fetchPostsPublic,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function usePostBySlug(slug: string) {
  return useQuery<PostApi | undefined>({
    queryKey: ['posts-public', 'slug', slug],
    queryFn: () => fetchPostBySlug(slug),
    enabled: slug.length > 0 && isNaN(Number(slug)),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useFilteredPosts(dateFilter: number, orderBy: number) {
  return useQuery<PostApi[]>({
    queryKey: ['posts-filtered', dateFilter, orderBy],
    queryFn: () => fetchFilteredPosts(dateFilter, orderBy),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function usePostById(id: number) {
  return useQuery<PostApi | undefined>({
    queryKey: ['posts-public', 'single', id],
    queryFn: async () => {
      // Try public posts first
      const posts = await fetchPostsPublic();
      const found = posts.find((p) => p.id === id);
      if (found) return found;
      
      // If not found in public, search editorial endpoints (88FM editorials)
      const editorialIds = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
      for (const eid of editorialIds) {
        try {
          const editorialPosts = await fetchPostsByEditorial(eid);
          const match = editorialPosts.find((p) => p.id === id);
          if (match) return match;
        } catch {
          // continue searching
        }
      }
      return undefined;
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
