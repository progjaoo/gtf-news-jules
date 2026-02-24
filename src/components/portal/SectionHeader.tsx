import React from 'react';
import { cn } from '@/lib/utils';
import { EditorialType } from '@/contexts/EditorialContext';

interface SectionHeaderProps {
  title: string;
  editorial?: EditorialType;
  className?: string;
}

const categoryColors: Partial<Record<EditorialType, string>> = {
  noticias: 'bg-editorial-noticias',
  nacional: 'bg-editorial-nacional',
  esportes: 'bg-editorial-esportes',
  negocios: 'bg-editorial-negocios',
  inovacao: 'bg-editorial-inovacao',
  cultura: 'bg-editorial-cultura',
  servicos: 'bg-editorial-servicos',
};

export function SectionHeader({ title, editorial = 'noticias', className }: SectionHeaderProps) {
  return (
    <div className={cn('section-header', className)}>
      <div className={cn('w-1 h-6 rounded-full', categoryColors[editorial] || 'bg-primary')} />
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
