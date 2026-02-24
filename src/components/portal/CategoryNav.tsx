import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorial } from '@/contexts/EditorialContext';
import { cn } from '@/lib/utils';

export function CategoryNav() {
  const { currentEditorial, setEditorial, editorials } = useEditorial();
  const navigate = useNavigate();

  const handleClick = (editorial: typeof editorials[0]) => {
    // Se o editorial tem link direto (ex: Fato Popular na 88FM), navega para lá
    if (editorial.isLink && editorial.linkTo) {
      navigate(editorial.linkTo);
      return;
    }
    setEditorial(editorial.id);
    navigate(`/editorial/${editorial.apiId}`);
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="container">
        <div className="flex items-center justify-center gap-4 py-3 overflow-x-auto no-scrollbar">
          {editorials.map((editorial) => (
            <button
              key={editorial.id}
              onClick={() => handleClick(editorial)}
              className={cn(
                'nav-category min-w-fit px-5 py-1 transition-all duration-200',
                currentEditorial === editorial.id && 'opacity-100',
                currentEditorial !== editorial.id && 'opacity-70 hover:opacity-100'
              )}
            >
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: editorial.corPrimaria }}
                />
                <span className={cn(
                  'nav-category-label transition-colors duration-200',
                  currentEditorial === editorial.id 
                    ? 'text-foreground font-bold'
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
