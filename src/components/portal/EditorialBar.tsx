import React from 'react';
import { useEditorial } from '@/contexts/EditorialContext';
import { Search } from 'lucide-react';

export function EditorialBar() {
  const { getEditorialLabel } = useEditorial();

  return (
    <div className="editorial-bar">
      <div className="container flex items-center justify-between h-10">
        <span className="text-primary-foreground font-bold text-sm tracking-wide">
          {getEditorialLabel()}
        </span>
        
        <button className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <Search size={16} />
        </button>
      </div>
    </div>
  );
}
