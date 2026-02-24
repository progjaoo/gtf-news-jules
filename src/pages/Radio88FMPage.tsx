import { StickyHeader } from '@/components/portal/StickyHeader';
import { Footer } from '@/components/portal/Footer';
import { AdBanner } from '@/components/portal/AdBanner';
import { SectionHeader } from '@/components/portal/SectionHeader';
import { NewsCard } from '@/components/portal/NewsCard';
import { VerMaisButton } from '@/components/portal/VerMaisButton';
import { usePosts } from '@/hooks/useArticles';
import { useNavigate } from 'react-router-dom';
import { PostApi } from '@/services/dotnetApi';
import { Skeleton } from '@/components/ui/skeleton';

function HeroCard({ post, size = 'normal' }: { post: PostApi; size?: 'large' | 'normal' }) {
  const navigate = useNavigate();

  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-lg cursor-pointer group',
        size === 'large' ? 'row-span-2' : ''
      )}
      onClick={() => navigate(`/noticia/${post.id}`)}
    >
      <div className={cn('w-full bg-muted', size === 'large' ? 'h-full min-h-[400px]' : 'h-[195px]')}>
        <img
          src={post.imagem || '/placeholder.svg'}
          alt={post.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {/* Overlay com editorial badge e título */}
      <div className="absolute bottom-0 left-0 right-0 p-4"
           style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)' }}>
        {post.editorial && (
          <span className="inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wide mb-2 rounded"
                style={{ backgroundColor: post.corTema || '#038CE4', color: '#fff' }}>
            {post.editorial}
          </span>
        )}
        <h3 className="text-primary-foreground font-bold leading-tight line-clamp-3 text-sm">
          {post.titulo}
        </h3>
      </div>
    </article>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function Radio88FMContent() {
  const { data: posts, isLoading } = usePosts();
  const allNews = posts || [];

  // Hero: 6 posts em grid 3x2
  const heroNews = allNews.slice(0, 6);
  // Seção editorial por categoria
  const negociosNews = allNews.filter(n => n.editorial === 'Negócios' || n.editorial === 'Negocios').slice(0, 4);
  const culturaNews = allNews.filter(n => n.editorial === 'Cultura').slice(0, 1);
  const noticiasNews = allNews.filter(n => n.editorial === 'Notícias' || n.editorial === 'Noticias').slice(0, 1);
  const esportesNews = allNews.filter(n => n.editorial === 'Esportes').slice(0, 1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <div className="container py-6">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* Hero Grid 3x2 com overlay */}
      <section className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {heroNews[0] && (
            <HeroCard post={heroNews[0]} size="large" />
          )}
          {heroNews.slice(1, 3).map((post) => (
            <HeroCard key={post.id} post={post} />
          ))}
          {heroNews.slice(3, 6).map((post) => (
            <HeroCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Negócios Section */}
      {negociosNews.length > 0 && (
        <section className="container py-8">
          <SectionHeader title="Negócios" editorial="negocios" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {negociosNews.map((news) => (
              <NewsCard key={news.id} news={news} showSubtitle={false} />
            ))}
          </div>
          <VerMaisButton size="full" />
        </section>
      )}

      {/* 3 colunas: Cultura, Notícias, Esportes */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <SectionHeader title="Cultura" editorial="cultura" />
            <div className="space-y-4">
              {culturaNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
            <VerMaisButton size="medium" />
          </div>
          <div>
            <SectionHeader title="Notícias" editorial="noticias" />
            <div className="space-y-4">
              {noticiasNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
            <VerMaisButton size="medium" />
          </div>
          <div>
            <SectionHeader title="Esportes" editorial="esportes" />
            <div className="space-y-4">
              {esportesNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
            <VerMaisButton size="medium" />
          </div>
        </div>
      </section>

      <AdBanner />
      <Footer />
    </div>
  );
}

export default function Radio88FMPage() {
  return <Radio88FMContent />;
}
