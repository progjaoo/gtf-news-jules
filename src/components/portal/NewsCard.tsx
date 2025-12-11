import React from 'react';
import { cn } from '@/lib/utils';
import { EditorialType } from '@/contexts/EditorialContext';

export interface NewsItem {
  id: number;
  titulo: string;
  subtitulo?: string;
  imagem: string;
  editoria: EditorialType;
  dataPublicacao: string;
}

interface NewsCardProps {
  news: NewsItem;
  variant?: 'small' | 'medium' | 'large' | 'horizontal';
  showImage?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

const categoryColors: Record<EditorialType, string> = {
  noticias: 'bg-editorial-noticias',
  nacional: 'bg-editorial-nacional',
  esportes: 'bg-editorial-esportes',
  negocios: 'bg-editorial-negocios',
  inovacao: 'bg-editorial-inovacao',
  cultura: 'bg-editorial-cultura',
  servicos: 'bg-editorial-servicos',
};

export function NewsCard({ 
  news, 
  variant = 'medium', 
  showImage = true,
  showSubtitle = true,
  className 
}: NewsCardProps) {
  const isSmall = variant === 'small';
  const isLarge = variant === 'large';
  const isHorizontal = variant === 'horizontal';

  if (isHorizontal) {
    return (
      <article className={cn('news-card flex gap-3 cursor-pointer', className)}>
        {showImage && (
          <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded">
            <img 
              src={news.imagem} 
              alt={news.titulo}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <div className={cn('w-1.5 h-1.5 rounded-sm', categoryColors[news.editoria])} />
          </div>
          <h3 className="news-card-title text-sm line-clamp-2">
            {news.titulo}
          </h3>
          {showSubtitle && news.subtitulo && (
            <p className="news-card-subtitle text-xs mt-1 line-clamp-2">
              {news.subtitulo}
            </p>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className={cn('news-card cursor-pointer', className)}>
      {showImage && (
        <div className={cn(
          'overflow-hidden',
          isLarge ? 'aspect-[16/10]' : 'aspect-video'
        )}>
          <img 
            src={news.imagem} 
            alt={news.titulo}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className={cn('pt-2', isLarge && 'pt-3')}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className={cn('w-1.5 h-1.5 rounded-sm', categoryColors[news.editoria])} />
        </div>
        <h3 className={cn(
          'news-card-title',
          isSmall && 'text-sm line-clamp-2',
          !isSmall && !isLarge && 'text-base line-clamp-3',
          isLarge && 'text-xl line-clamp-3'
        )}>
          {news.titulo}
        </h3>
        {showSubtitle && news.subtitulo && (
          <p className={cn(
            'news-card-subtitle mt-1.5',
            isSmall && 'text-xs line-clamp-2',
            !isSmall && 'line-clamp-2'
          )}>
            {news.subtitulo}
          </p>
        )}
      </div>
    </article>
  );
}
