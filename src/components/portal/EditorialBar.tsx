import React from 'react';
import { useEditorial } from '@/contexts/EditorialContext';
import { MainDrawer } from './MainDrawer';
import { SearchBox } from './SearchBox';

/**
 * Header fixo superior com título centralizado.
 * Ao abrir search ou drawer, o centro nunca se movimenta.
 */
export function EditorialBar() {
  const { getEditorialLabel } = useEditorial();

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
        {/* ------------------------------- 
           ESQUERDA - Ícone + texto MENU
        -------------------------------- */}
        <div className="flex items-center gap-0 w-[90px]">
          <MainDrawer/>
          <span className="text-white font-semibold text-sm">MENU</span>
        </div>

        {/* ------------------------------- 
           CENTRO FIXO – sempre alinhado
        -------------------------------- */}
        <span className="absolute left-1/2 -translate-x-1/2 text-white font-bold text-base tracking-wide">
          {getEditorialLabel()}
        </span>

        {/* ------------------------------- 
           DIREITA – Search
        -------------------------------- */}
        <div className="w-[90px] flex justify-end">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}