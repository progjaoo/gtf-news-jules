import React from 'react';
import { MainDrawer } from './MainDrawer';
import { SearchBox } from './SearchBox';
import { useStation } from '@/contexts/StationContext';
import logo88 from '@/assets/logo88.svg';

// Mapeamento de logos por station - será alimentado via API
const stationLogos: Record<string, string> = {
  'radio88fm': logo88,
  'radio89maravilha': logo88, // Substituir por logoMaravilha.svg quando disponível
  'gtfnews': logo88, // Manter logo88 até ter logo específica
};

export function EditorialBar() {
  const { currentStation } = useStation();
  const logoSrc = stationLogos[currentStation.id] || logo88;

  return (
    <div className="editorial-bar sticky top-0 z-50 shadow-sm">
      <div
        className="
          container 
          flex items-center 
          justify-between 
          h-[70px] 
          w-full
          relative
        "
      >
        {/* ESQUERDA - Ícone + texto MENU */}
        <div className="flex items-center gap-0 w-[90px]">
          <MainDrawer/>
          <span className="text-white font-semibold text-sm">MENU</span>
        </div>

        {/* CENTRO FIXO – Logo da emissora */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img 
            src={logoSrc} 
            alt={currentStation.name} 
            className="h-10 w-auto"
          />
        </div>

        {/* DIREITA – Search */}
        <div className="w-[90px] flex justify-end">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
