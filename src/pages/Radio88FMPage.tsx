import { StickyHeader } from '@/components/portal/StickyHeader';
import { Footer } from '@/components/portal/Footer';
import { AdBanner } from '@/components/portal/AdBanner';
import { SectionHeader } from '@/components/portal/SectionHeader';
import { NewsCard } from '@/components/portal/NewsCard';
import { usePosts, usePostsByEditorial } from '@/hooks/useArticles';
import { useNavigate } from 'react-router-dom';
import { PostApi, resolveImageUrl } from '@/services/dotnetApi';
import { Skeleton } from '@/components/ui/skeleton';
import { useStation } from '@/contexts/StationContext';
import { useEditorial } from '@/contexts/EditorialContext';

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

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

function Radio88FMContent() {
  const navigate = useNavigate();
  const { currentStation } = useStation();

  // Buscar posts dos editoriais da 88FM: Receitas(9), Música(10), Enquete(11), Debates(12)
  const { data: receitasPosts } = usePostsByEditorial(9);
  const { data: musicaPosts } = usePostsByEditorial(10);
  const { data: enquetePosts } = usePostsByEditorial(11);
  const { data: debatesPosts } = usePostsByEditorial(12);

  // Combinar todos os posts da 88FM para o hero
  const allRadioPosts = [
    ...(receitasPosts || []),
    ...(musicaPosts || []),
    ...(enquetePosts || []),
    ...(debatesPosts || []),
  ];

  const heroNews = allRadioPosts.slice(0, 6);

  // Posts gatilho do Fato Popular para a seção inferior
  const { data: allPosts, isLoading } = usePosts();
  const fatoPosts = (allPosts || []);
  const culturaNews = fatoPosts.filter(n => n.editorial === 'Cultura').slice(0, 1);
  const noticiasNews = fatoPosts.filter(n => n.editorial === 'Notícias' || n.editorial === 'Noticias').slice(0, 1);
  const esportesNews = fatoPosts.filter(n => n.editorial === 'Esportes').slice(0, 1);

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

      {/* Hero Grid 3x2 com posts da Rádio 88 FM */}
      <section className="container py-6">
        {heroNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heroNews[0] && <HeroCard post={heroNews[0]} size="large" />}
            {heroNews.slice(1, 3).map((post) => (
              <HeroCard key={post.id} post={post} />
            ))}
            {heroNews.slice(3, 6).map((post) => (
              <HeroCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Nenhuma notícia da Rádio 88 FM disponível no momento.</p>
          </div>
        )}
      </section>

      {/* Seção Gatilho: Fato Popular */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <SectionHeader title="Cultura" editorial="cultura" />
            <div className="space-y-4">
              {culturaNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Notícias" editorial="noticias" />
            <div className="space-y-4">
              {noticiasNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Esportes" editorial="esportes" />
            <div className="space-y-4">
              {esportesNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Botões Ver Mais por editorial */}
     {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/editorial/6')}
              className="px-6 py-2 rounded-md font-bold text-xs uppercase tracking-wide text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#038CE4' }}
            >
              Ver mais Cultura
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/editorial/1')}
              className="px-6 py-2 rounded-md font-bold text-xs uppercase tracking-wide text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#E83C25' }}
            >
              Ver mais Notícias
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/editorial/2')}
              className="px-6 py-2 rounded-md font-bold text-xs uppercase tracking-wide text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#06AA48' }}
            >
              Ver mais Esportes
            </button>
          </div>
        </div> */}

        {/* Botão geral Fato Popular */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/fatopopular')}
            className="px-80 py-2 rounded-md font-bold text-sm uppercase tracking-wide text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#132D52' }}
          >
            Ver mais no Fato Popular
          </button>
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
