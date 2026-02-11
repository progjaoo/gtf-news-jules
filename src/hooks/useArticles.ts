import { useQuery } from '@tanstack/react-query';
import { fetchArticles, fetchArticleBySlug } from '@/services/strapiApi';
import { mockNews } from '@/data/mockNews';
import { NewsItem } from '@/components/portal/NewsCard';

export function useArticles() {
  return useQuery<NewsItem[]>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 1,
    // Fallback para mock data se a API não estiver disponível
    placeholderData: mockNews,
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
