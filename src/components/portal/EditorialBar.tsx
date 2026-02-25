import React from 'react';
import { MainDrawer } from './MainDrawer';
import { SearchBox } from './SearchBox';
import { useStation } from '@/contexts/StationContext';
import { useEditorial } from '@/contexts/EditorialContext';
import logo88 from '@/assets/logoazul.svg';
import logomaravilha from '@/assets/logomaravilha.svg';
import { Link, useLocation } from 'react-router-dom';

// Mapeamento de logos por station
const stationLogos: Record<string, string> = {
  'radio88fm': logo88,
  'radio89maravilha': logomaravilha,
  'gtfnews': logo88, 
  'fatopopular': logo88,
};

export function EditorialBar() {
  const { currentStation } = useStation();
  const { getEditorialInfo } = useEditorial();
  const location = useLocation();
  const logoSrc = stationLogos[currentStation.id];

  const stationHomePath = `/${currentStation.id}`;

  // Use editorial color when on an editorial page, otherwise station color
  const isEditorialPage = location.pathname.startsWith('/editorial/');
  const isArticlePage = location.pathname.startsWith('/noticia/');
  const editorialInfo = getEditorialInfo();
  const barColor = (isEditorialPage || isArticlePage) && editorialInfo?.corPrimaria
    ? editorialInfo.corPrimaria
    : currentStation.color;

  return (
    <div className="editorial-bar shadow-sm"
         style={{ backgroundColor: barColor }}>
      
      <div className="container flex items-center justify-between h-[70px] w-full relative">

        <div className="flex items-center gap-0 w-[90px]">
          <MainDrawer />
          <span className="text-primary-foreground font-semibold text-sm">MENU</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to={stationHomePath} className="flex items-center gap-3">
            <img src={logoSrc} alt={currentStation.name} className="h-10 w-auto" />
            {currentStation.id === 'fatopopular' && (
              <>
                <span className="text-primary-foreground text-lg font-light">|</span>
                <span className="text-primary-foreground font-bold text-sm tracking-wide uppercase">
                  Fato Popular
                </span>
              </>
            )}
          </Link>
        </div>

        <div className="w-[90px] flex justify-end">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}