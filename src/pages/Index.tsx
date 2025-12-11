import { EditorialProvider } from '@/contexts/EditorialContext';
import { TopHeader } from '@/components/portal/TopHeader';
import { EditorialBar } from '@/components/portal/EditorialBar';
import { CategoryNav } from '@/components/portal/CategoryNav';
import { AdBanner } from '@/components/portal/AdBanner';
import { HeroSection } from '@/components/portal/HeroSection';
import { EditorialSection } from '@/components/portal/EditorialSection';
import { NewsGrid } from '@/components/portal/NewsGrid';
import { SectionHeader } from '@/components/portal/SectionHeader';
import { Footer } from '@/components/portal/Footer';
import { mockNews, mockNegociosNews } from '@/data/mockNews';

function PortalContent() {
  const mainNews = mockNews[0];
  const sideNews = mockNews.slice(1, 10);
  const gridNews = mockNews.slice(2, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <TopHeader />
      <EditorialBar />
      <CategoryNav />

      {/* Ad Banner */}
      <AdBanner />

      {/* Hero Section */}
      <HeroSection mainNews={mainNews} sideNews={sideNews} />

      {/* Main News Grid */}
      <section className="container pb-8">
        <NewsGrid news={gridNews} columns={3} />
      </section>

      {/* Secondary Grid */}
      <section className="container pb-8">
        <NewsGrid news={mockNews.slice(8, 14)} columns={3} />
      </section>

      {/* Negócios Section */}
      <EditorialSection 
        title="Negócios" 
        editorial="negocios" 
        news={mockNegociosNews.slice(0, 4)} 
      />

      {/* Theme Sections */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <SectionHeader title="Tema dois" editorial="nacional" />
            <NewsGrid news={[mockNews[14]]} columns={1} />
          </div>
          <div>
            <SectionHeader title="Tema dois" editorial="cultura" />
            <NewsGrid news={[mockNews[15]]} columns={1} />
          </div>
          <div>
            <SectionHeader title="Tema três" editorial="esportes" />
            <NewsGrid news={[mockNews[10]]} columns={1} />
          </div>
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <AdBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}

const Index = () => {
  return (
    <EditorialProvider>
      <PortalContent />
    </EditorialProvider>
  );
};

export default Index;
