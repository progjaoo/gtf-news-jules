import React from 'react';
import { MainDrawer } from './MainDrawer';
import { SearchBox } from './SearchBox';
import { useStation } from '@/contexts/StationContext';
import logo88 from '@/assets/logoazul.svg';
import logomaravilha from '@/assets/logomaravilha.svg';
import { Link } from 'react-router-dom';

// Mapeamento de logos por station
const stationLogos: Record<string, string> = {
  'radio88fm': logo88,
  'radio89maravilha': logomaravilha,
  'gtfnews': logo88, 
  'fatopopular': logo88,
};

export function EditorialBar() {
  const { currentStation } = useStation();
  const logoSrc = stationLogos[currentStation.id];

  const stationHomePath = `/${currentStation.id}`;

  return (
    <div className="editorial-bar shadow-sm"
         style={{ backgroundColor: currentStation.color }}>
      
      <div className="container flex items-center justify-between h-[70px] w-full relative">

        <div className="flex items-center gap-0 w-[90px]">
          <MainDrawer />
          <span className="text-primary-foreground font-semibold text-sm">MENU</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
        <Link to={stationHomePath} className="flex items-center">
          <img src={logoSrc} alt={currentStation.name} className="h-10 w-auto" />
        </Link>
        </div>

        <div className="w-[90px] flex justify-end">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}