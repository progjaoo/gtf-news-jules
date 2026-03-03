import { AdBanner } from '@/components/portal/AdBanner';
import { HeroSection } from '@/components/portal/HeroSection';
import { EditorialSection } from '@/components/portal/EditorialSection';
import { NewsGrid } from '@/components/portal/NewsGrid';
import { SectionHeader } from '@/components/portal/SectionHeader';
import { Footer } from '@/components/portal/Footer';
import { StickyHeader } from '@/components/portal/StickyHeader';
import { NewsCard } from '@/components/portal/NewsCard';
import { VerMaisButton } from '@/components/portal/VerMaisButton';
import { useNavigate } from 'react-router-dom';
import { usePosts, usePostsByEditorial } from '@/hooks/useArticles';
import { useEditorial } from '@/contexts/EditorialContext';
import { PostApi, resolveImageUrl } from '@/services/dotnetApi';
import { cn } from '@/lib/utils';

function PortalContent() {
  const { data: posts, isLoading } = usePosts();
  const navigate = useNavigate();
  
  const allNews = posts || [];
  
  const mainNews = allNews[0];
  const sideNews = allNews.slice(1, 10);
  const gridNews = allNews.slice(2, 8);


  // Buscar posts da Rádio 88 FM (Trigger)
  const { data: receitasPosts } = usePostsByEditorial(9);
  const { data: musicaPosts } = usePostsByEditorial(10);
  const { data: enquetePosts } = usePostsByEditorial(11);
  const { data: debatesPosts } = usePostsByEditorial(12);

  // Filtra por editorial usando o campo string da API
  const negociosNews = allNews.filter(n => n.editorial === 'Negócios' || n.editorial === 'Negocios').slice(0, 4);
  const nacionalNews = allNews.filter(n => n.editorial === 'Nacional').slice(0, 3);
  const culturaNews = allNews.filter(n => n.editorial === 'Cultura').slice(0, 3);
  const esportesNews = allNews.filter(n => n.editorial === 'Esportes').slice(0, 3);

  const radio88News = [
    ...(receitasPosts || []),
    ...(musicaPosts || []),
    ...(enquetePosts || []),
    ...(debatesPosts || []),
  ].slice(0, 6);

function HeroCard({ post, size = 'normal' }: { post: PostApi; size?: 'large' | 'normal' }) {
  const navigate = useNavigate();
  const { resolveEditorialColor } = useEditorial();
  
  // Usamos a função para definir a cor final
  const bgColor = resolveEditorialColor(post.editorial, post.corTema);

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-lg cursor-pointer group shadow-sm bg-white',
        size === 'large' ? 'md:col-span-1 md:row-span-2' : ''
      )}
      onClick={() => navigate(`/noticia/${post.id}`)}
    >
      <div className={cn(
        'relative w-full overflow-hidden',
        size === 'large' ? 'h-[300px] md:h-[70%]' : 'h-[140px]'
      )}>
        <img
          src={resolveImageUrl(post.imagem)}
          alt={post.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {post.editorial && (
          <div className="absolute bottom-2 left-2">
            <span 
              className="px-2 py-0.5 text-[10px] font-bold uppercase text-white rounded border border-white/20"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            >
              {post.editorial}
            </span>
          </div>
        )}
      </div>

      <div 
        className="flex-1 p-4 flex flex-col justify-center min-h-[100px]"
        style={{ backgroundColor: bgColor }}
      >
        <h3 className={cn(
          "text-white font-bold leading-tight line-clamp-3",
          size === 'large' ? "text-lg md:text-xl" : "text-sm"
        )}>
          {post.titulo}
        </h3>
      </div>
    </article>
  );
}
  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <AdBanner />

      {/* Hero Section */}
      <HeroSection mainNews={mainNews} sideNews={sideNews} />

      {/* Main News Grid */}
      <section className="container pb-10">
        <NewsGrid news={gridNews} columns={3} />
      </section>

      {/* Secondary Grid */}
      <section className="container pb-8">
        <NewsGrid news={allNews.slice(8)} columns={3} />
      </section>

      {/* Negócios Section */}
      {negociosNews.length > 0 && (
        <>
          <EditorialSection title="Negócios" editorial="negocios" news={negociosNews} />
          <VerMaisButton size="full" label="Ver mais Negócios" onClick={() => navigate('/editorial/3')} />
        </>
      )}
       {/* Rádio 88 FM Trigger Section */}
      {radio88News.length > 0 && (
        <section className="container py-8">
          <SectionHeader title="Rádio 88 FM" editorial="cultura" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {radio88News.map((news) => (
              <HeroCard
                key={news.id}
                post={news}
                size="normal" 
              />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <VerMaisButton
              size="medium"
              label="Ver tudo da 88 FM"
              onClick={() => navigate('/radio88fm')}
            />
          </div>
        </section>
      )}
      {/* Theme Sections */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <SectionHeader title="Nacional" editorial="nacional" />
            <div className="space-y-4">
              {nacionalNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
            <VerMaisButton size="medium" label="Ver mais Nacional" onClick={() => navigate('/editorial/4')} />
          </div>
          <div>
            <SectionHeader title="Cultura" editorial="cultura" />
            <div className="space-y-4">
              {culturaNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
            <VerMaisButton size="medium" label="Ver mais Cultura" onClick={() => navigate('/editorial/6')} />
          </div>
          <div>
            <SectionHeader title="Esportes" editorial="esportes" />
            <div className="space-y-4">
              {esportesNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
            <VerMaisButton size="medium" label="Ver mais Esportes" onClick={() => navigate('/editorial/2')} />
          </div>
        </div>
      </section>

      <AdBanner />
      <Footer />
    </div>
  );
}

const Index = () => {
  return <PortalContent />;
};

export default Index;
