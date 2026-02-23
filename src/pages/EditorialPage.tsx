import React from 'react';
import { useParams } from 'react-router-dom';
import { StickyHeader } from '@/components/portal/StickyHeader';
import { AdBanner } from '@/components/portal/AdBanner';
import { Footer } from '@/components/portal/Footer';
import { PostHorizontalCard } from '@/components/portal/PostHorizontalCard';
import { SectionHeader } from '@/components/portal/SectionHeader';
import { usePostsByEditorial } from '@/hooks/useArticles';
import { useEditorial, EditorialType } from '@/contexts/EditorialContext';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

export default function EditorialPage() {
  const { editorialId } = useParams<{ editorialId: string }>();
  const numericId = Number(editorialId) || 1;
  const { editorials, setEditorial } = useEditorial();

  const { data: posts, isLoading, isError } = usePostsByEditorial(numericId);

  // Resolve editorial info from the numeric ID
  const editorialInfo = editorials.find((_, idx) => idx + 1 === numericId);

  // Sync editorial context for theming
  React.useEffect(() => {
    if (editorialInfo) {
      setEditorial(editorialInfo.id);
    }
  }, [editorialInfo, setEditorial]);

  const editorialLabel = editorialInfo?.label || 'EDITORIAL';
  const editorialType = (editorialInfo?.id || 'noticias') as EditorialType;

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <AdBanner />

      <section className="container py-10">
        <SectionHeader title={editorialLabel} editorial={editorialType} />

        {isLoading && (
          <div className="space-y-4 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex bg-card rounded-lg overflow-hidden border border-border">
                <Skeleton className="w-72 h-48 flex-shrink-0" />
                <div className="flex-1 p-5 space-y-3">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <AlertCircle className="w-10 h-10" />
            <p className="text-lg font-medium">Erro ao carregar notícias</p>
            <p className="text-sm">Tente novamente mais tarde.</p>
          </div>
        )}

        {!isLoading && !isError && posts && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <p className="text-lg font-medium">Nenhuma notícia encontrada</p>
            <p className="text-sm">Não há posts neste editorial no momento.</p>
          </div>
        )}

        {!isLoading && !isError && posts && posts.length > 0 && (
          <div className="space-y-4 mt-6">
            {posts.map((post) => (
              <PostHorizontalCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
