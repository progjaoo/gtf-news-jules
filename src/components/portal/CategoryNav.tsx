import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorial, EditorialType } from '@/contexts/EditorialContext';
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

const categoryTextColors: Record<EditorialType, string> = {
  noticias: 'text-editorial-noticias',
  nacional: 'text-editorial-nacional',
  esportes: 'text-editorial-esportes',
  negocios: 'text-editorial-negocios',
  inovacao: 'text-editorial-inovacao',
  cultura: 'text-editorial-cultura',
  servicos: 'text-editorial-servicos',
};

export function CategoryNav() {
  const { currentEditorial, setEditorial, editorials } = useEditorial();
  const navigate = useNavigate();

  const handleClick = (editorial: typeof editorials[0], index: number) => {
    setEditorial(editorial.id);
    navigate(`/editorial/${index + 1}`);
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="container">
        <div className="flex items-center justify-center gap-4 py-3 overflow-x-auto no-scrollbar">
          {editorials.map((editorial, index) => (
            <button
              key={editorial.id}
              onClick={() => handleClick(editorial, index)}
              className={cn(
                'nav-category min-w-fit px-5 py-1 transition-all duration-200',
                currentEditorial === editorial.id && 'opacity-100',
                currentEditorial !== editorial.id && 'opacity-70 hover:opacity-100'
              )}
            >
              <div className="flex items-center gap-1.5">
                <div className={cn('w-2 h-2 rounded-sm', categoryColors[editorial.id])} />
                <span className={cn(
                  'nav-category-label transition-colors duration-200',
                  currentEditorial === editorial.id 
                    ? categoryTextColors[editorial.id]
                    : 'text-foreground'
                )}>
                  {editorial.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
