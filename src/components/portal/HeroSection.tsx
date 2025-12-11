import React from 'react';
import { NewsCard, NewsItem } from './NewsCard';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  mainNews: NewsItem;
  sideNews: NewsItem[];
}

export function HeroSection({ mainNews, sideNews }: HeroSectionProps) {
  return (
    <section className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Hero */}
        <div className="lg:col-span-2">
          <article className="cursor-pointer group">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
              <span className="inline-block w-1.5 h-8 bg-primary rounded mr-3 align-middle" />
              {mainNews.titulo}
            </h1>
            <ul className="space-y-2 text-sm text-foreground">
              {sideNews.slice(0, 3).map((news, index) => (
                <li key={index} className="flex items-start gap-2 hover:text-primary cursor-pointer transition-colors">
                  <span className="inline-block w-1.5 h-1.5 bg-primary rounded mt-2 flex-shrink-0" />
                  <span className="line-clamp-2">{news.titulo}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Side News */}
        <div className="space-y-4">
          {sideNews.slice(3, 5).map((news) => (
            <NewsCard 
              key={news.id} 
              news={news} 
              variant="horizontal"
              showSubtitle={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
