import React from 'react';
import { NewsCard, NewsItem } from './NewsCard';

interface NewsGridProps {
  news: NewsItem[];
  columns?: 1 | 2 | 3 | 4;
}

export function NewsGrid({ news, columns = 3 }: NewsGridProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClass[columns]} gap-6`}>
      {news.map((item) => (
        <NewsCard key={item.id} news={item} variant="medium" />
      ))}
    </div>
  );
}
