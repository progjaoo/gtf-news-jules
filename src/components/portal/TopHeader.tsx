import React from 'react';
import { MapPin } from 'lucide-react';
import { MainDrawer } from './MainDrawer';
import { SearchBox } from './SearchBox';
import { StationSelector } from './StationSelector';
import { useStation } from '@/contexts/StationContext';
import { useEditorial } from '@/contexts/EditorialContext';
import { useLocation } from 'react-router-dom';

export function TopHeader() {
  const { currentStation } = useStation();
  const { getEditorialInfo } = useEditorial();
  const location = useLocation();
  
  // PASSO 2: Use editorial color when on editorial or article page
  const isEditorialPage = location.pathname.startsWith('/editorial/');
  const isArticlePage = location.pathname.startsWith('/noticia/');
  const editorialInfo = getEditorialInfo();
  const activeColor = (isEditorialPage || isArticlePage) && editorialInfo?.corPrimaria
    ? editorialInfo.corPrimaria
    : currentStation.color;

  return (
    <header className="bg-card border-b border-border">
      <div className="container flex items-center justify-between h-12">

        <div className="flex items-center gap-3">
          <StationSelector />
          <span className="text-sm text-muted-foreground mx-1 hidden sm:inline">|</span>

          <span
            className="text-sm font-semibold hidden sm:inline"
            style={{ color: activeColor }}
          >
            BRASIL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MapPin size={14} />
            <span className="hidden sm:inline">Rio de Janeiro</span>
          </button>
        </div>

      </div>
    </header>
  );
}
