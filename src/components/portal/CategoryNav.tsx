import React from 'react';
import { useEditorial, editorials, EditorialType } from '@/contexts/EditorialContext';
import { cn } from '@/lib/utils';

const categoryColors: Record<EditorialType, string> = {
  noticias: 'bg-editorial-noticias',
  nacional: 'bg-editorial-nacional',
  esportes: 'bg-editorial-esportes',
  negocios: 'bg-editorial-negocios',
  inovacao: 'bg-editorial-inovacao',
  cultura: 'bg-editorial-cultura',
  servicos: 'bg-editorial-servicos',
};

export function CategoryNav() {
  const { currentEditorial, setEditorial } = useEditorial();

  return (
    <nav className="bg-card border-b border-border">
      <div className="container">
        <div className="flex items-center justify-center gap-2 md:gap-6 py-3 overflow-x-auto">
          {editorials.map((editorial) => (
            <button
              key={editorial.id}
              onClick={() => setEditorial(editorial.id)}
              className={cn(
                'nav-category min-w-fit',
                currentEditorial === editorial.id && 'opacity-100',
                currentEditorial !== editorial.id && 'opacity-70 hover:opacity-100'
              )}
            >
              <div className="flex items-center gap-1.5">
                <div className={cn('w-2 h-2 rounded-sm', categoryColors[editorial.id])} />
                <span className={cn(
                  'nav-category-label',
                  currentEditorial === editorial.id && 'text-primary'
                )}>
                  {editorial.label}
                </span>
              </div>
              <span className="nav-category-sub">{editorial.subtopico}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
