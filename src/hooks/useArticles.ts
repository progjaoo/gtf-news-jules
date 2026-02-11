import { useQuery } from '@tanstack/react-query';
import { fetchArticles, fetchArticleBySlug, fetchArticleByDocumentId } from '@/services/strapiApi';
import { NewsItem } from '@/components/portal/NewsCard';

export function useArticles() {
  return useQuery<NewsItem[]>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery<NewsItem | null>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useArticleByDocumentId(documentId: string) {
  return useQuery<NewsItem | null>({
    queryKey: ['article', 'doc', documentId],
    queryFn: () => fetchArticleByDocumentId(documentId),
    enabled: !!documentId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
