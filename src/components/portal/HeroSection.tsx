import React from 'react';
import { NewsCard } from './NewsCard';
import { PostApi } from '@/services/dotnetApi';
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <article
            className="cursor-pointer group"
            onClick={() => navigate(`/noticia/${mainNews.id}`)}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
              <span
                className="inline-block w-1.5 h-8 rounded mr-3 align-middle"
                style={{ backgroundColor: mainNews.corTema }}
              />
              {mainNews.titulo}
            </h1>
            <ul className="space-y-2 text-sm font-[550] text-foreground">
              {sideNews.slice(0, 3).map((news) => (
                <li
                  key={news.id}
                  className="flex items-start gap-2 hover:text-primary cursor-pointer transition-colors"
                  onClick={(e) => { e.stopPropagation(); navigate(`/noticia/${news.id}`); }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded mt-2 flex-shrink-0"
                    style={{ backgroundColor: news.corTema }}
                  />
                  <span className="line-clamp-2">{news.titulo}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="space-y-4">
          {sideNews.slice(3, 5).map((news) => (
            <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
