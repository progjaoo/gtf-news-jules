import { NewsItem } from '@/components/portal/NewsCard';
import { EditorialType } from '@/contexts/EditorialContext';

// URL base da API do Strapi - alterar para produção quando publicar
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  Content: string;
  publicatedAt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Campos que podem vir no futuro via API
  editoria?: string;
  image?: {
    url: string;
  };
}

interface StrapiResponse {
  data: StrapiArticle[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function mapEditoria(editoria?: string): EditorialType {
  const valid: EditorialType[] = ['noticias', 'nacional', 'esportes', 'negocios', 'inovacao', 'cultura', 'servicos'];
  if (editoria && valid.includes(editoria as EditorialType)) {
    return editoria as EditorialType;
  }
  return 'noticias';
}

export function strapiToNewsItem(article: StrapiArticle): NewsItem {
  return {
    id: article.id,
    titulo: article.title,
    subtitulo: article.description?.trim() || undefined,
    imagem: article.image?.url
      ? `${STRAPI_BASE_URL}${article.image.url}`
      : 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop',
    editoria: mapEditoria(article.editoria),
    dataPublicacao: article.publicatedAt || article.publishedAt,
    slug: article.slug,
    content: article.Content,
  };
}

export async function fetchArticles(): Promise<NewsItem[]> {
  const res = await fetch(`${STRAPI_BASE_URL}/api/articles`);
  if (!res.ok) throw new Error(`Strapi API error: ${res.status}`);
  const json: StrapiResponse = await res.json();
  return json.data.map(strapiToNewsItem);
}

export async function fetchArticleBySlug(slug: string): Promise<NewsItem | null> {
  const res = await fetch(`${STRAPI_BASE_URL}/api/articles?filters[slug][$eq]=${slug}`);
  if (!res.ok) throw new Error(`Strapi API error: ${res.status}`);
  const json: StrapiResponse = await res.json();
  if (json.data.length === 0) return null;
  return strapiToNewsItem(json.data[0]);
}
