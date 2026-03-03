import { AdBanner } from '@/components/portal/AdBanner';
import { HeroSection } from '@/components/portal/HeroSection';
import { EditorialSection } from '@/components/portal/EditorialSection';
import { NewsGrid } from '@/components/portal/NewsGrid';
import { SectionHeader } from '@/components/portal/SectionHeader';
import { Footer } from '@/components/portal/Footer';
import { StickyHeader } from '@/components/portal/StickyHeader';
import { NewsCard } from '@/components/portal/NewsCard';
import { VerMaisButton } from '@/components/portal/VerMaisButton';
import { usePosts, usePostsByEditorial } from '@/hooks/useArticles';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/portal/SEO';
import { useStation } from '@/contexts/StationContext';
import { useEditorial } from '@/contexts/EditorialContext';

function PortalContent() {
  const { currentStation } = useStation();
  const { getEditorialColor } = useEditorial();
  const { data: posts, isLoading } = usePosts();
  const navigate = useNavigate();

  // Buscar posts da Rádio 88 FM (Trigger)
  const { data: receitasPosts } = usePostsByEditorial(9);
  const { data: musicaPosts } = usePostsByEditorial(10);
  const { data: enquetePosts } = usePostsByEditorial(11);
  const { data: debatesPosts } = usePostsByEditorial(12);

  const radio88News = [
    ...(receitasPosts || []),
    ...(musicaPosts || []),
    ...(enquetePosts || []),
    ...(debatesPosts || []),
  ].slice(0, 5);
  
  // Filtra posts da Rádio 88 FM do feed principal (Emissora ID: 1, mas posts públicos podem vir misturados)
  // Como não temos o ID da emissora no PostApi retornado, vamos filtrar pelos editoriais específicos se for o caso,
  // ou assumir que a API de posts públicos já traz o que deve ser exibido no Fato Popular.
  // Entretanto, o requisito diz para filtrar. Vou filtrar pelos editoriais da 88FM.
  const allNews = (posts || []).filter(n => ![9, 10, 11, 12].includes(Number(n.editorial)));
  
  const mainNews = allNews[0];
  const sideNews = allNews.slice(1, 10);
  const gridNews = allNews.slice(2, 8);

  // Filtra por editorial usando o campo string da API
  const negociosNews = allNews.filter(n => n.editorial === 'Negócios' || n.editorial === 'Negocios').slice(0, 4);
  const nacionalNews = allNews.filter(n => n.editorial === 'Nacional').slice(0, 3);
  const culturaNews = allNews.filter(n => n.editorial === 'Cultura').slice(0, 3);
  const esportesNews = allNews.filter(n => n.editorial === 'Esportes').slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={currentStation.name}
        description={`Portal de notícias da ${currentStation.name}. Fique por dentro de tudo o que acontece no Brasil e no mundo.`}
      />
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
              <NewsCard
                key={news.id}
                news={news}
                variant="small"
                showSubtitle={false}
                className="bg-card shadow-sm border border-border/40"
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
