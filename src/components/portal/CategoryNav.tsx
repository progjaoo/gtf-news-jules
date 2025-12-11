import React, { useState } from 'react';
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

// Subtópicos por editoria - serão alimentados via API
const subtopics: Record<EditorialType, string[]> = {
  noticias: ['Política', 'Economia', 'Saúde', 'Educação'],
  nacional: ['Política', 'Economia', 'Sociedade', 'Segurança'],
  esportes: ['Futebol', 'Vôlei', 'Basquete', 'Automobilismo'],
  negocios: ['Mercado', 'Finanças', 'Empresas', 'Startups'],
  inovacao: ['Tecnologia', 'Ciência', 'Gadgets', 'IA'],
  cultura: ['Cinema', 'Música', 'Arte', 'Literatura'],
  servicos: ['Utilidade', 'Clima', 'Trânsito', 'Vagas'],
};

export function CategoryNav() {
  const { currentEditorial, setEditorial } = useEditorial();
  const [hoveredEditorial, setHoveredEditorial] = useState<EditorialType | null>(null);

  return (
    <nav className="bg-card border-b border-border">
      <div className="container">
        <div className="flex items-center justify-center gap-4 py-3 overflow-x-auto no-scrollbar">
          {editorials.map((editorial) => (
            <div
              key={editorial.id}
              className="relative"
              onMouseEnter={() => setHoveredEditorial(editorial.id)}
              onMouseLeave={() => setHoveredEditorial(null)}
            >
              <button
                onClick={() => setEditorial(editorial.id)}
                className={cn(
                  'nav-category min-w-fit px-5 py-1',
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
              </button>

              {/* Dropdown de subtópicos */}
              {/* {hoveredEditorial === editorial.id && (
                <div className={cn(
                  'absolute top-full left-0 mt-1 min-w-40 bg-card border border-border rounded-md shadow-lg z-50',
                  'animate-in fade-in-0 zoom-in-95 duration-150'
                )}>
                  <div className="py-1">
                    {subtopics[editorial.id].map((subtopic) => (
                      <button
                        key={subtopic}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setEditorial(editorial.id)}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
