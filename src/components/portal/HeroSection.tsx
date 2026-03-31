import React from 'react';
import { NewsCard } from './NewsCard';
import { PostApi, resolveImageUrl } from '@/services/dotnetApi';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  mainNews?: PostApi;
  sideNews: PostApi[];
}

export function HeroSection({ mainNews, sideNews }: HeroSectionProps) {
  const navigate = useNavigate();

  if (!mainNews) {
    return (
      <section className="container py-6">
        <p className="text-muted-foreground text-center py-10">Carregando notícias...</p>
      </section>
    );
  }

  return (
    <section className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 ml-10">
          <article 
            className="cursor-pointer group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col"
            onClick={() => navigate(`/noticia/${mainNews.id}`)}
          >
            <div className="relative aspect-[16/8] overflow-hidden">
              <img 
                src={resolveImageUrl(mainNews.imagemCapaUrl, mainNews.imagemCapaId)} 
                alt={mainNews.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div 
                className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white rounded uppercase"
                style={{ backgroundColor: mainNews.corTema }}
              >
                Destaque
              </div>
            </div>

            <div className="p-2 md:p-4 flex flex-col gap-2">
            
              <h1 
                className="text-2xl md:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight transition-colors"
                
              >
                {mainNews.titulo}
              </h1>

              <p className="text-base md:text-lg text-gray-500 leading-relaxed line-clamp-2">
                {mainNews.subtitulo}
              </p>
            </div>
          </article>
        </div>

        {/* COLUNA DA DIREITA: MAIS LIDAS */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-bold text-foreground">
              Mais Lidas
            </h2>
          </div>
          
          <div className="flex flex-col gap-2">
            {sideNews.slice(0, 4).map((news) => (
              <NewsCard 
                key={news.id} 
                news={news} 
                variant="horizontal" 
                showSubtitle={false} 
                className="bg-white border border-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
