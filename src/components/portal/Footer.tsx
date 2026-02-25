import { useStation } from '@/contexts/StationContext';
import { useEditorial } from '@/contexts/EditorialContext';
import React from 'react';
import { useLocation } from 'react-router-dom';

export function Footer() {
  const { currentStation } = useStation();
  const { getEditorialInfo } = useEditorial();
  const location = useLocation();

  // Determine footer color: editorial color if on editorial/article page, else station color
  const isEditorialRoute = location.pathname.startsWith('/editorial/') || location.pathname.startsWith('/noticia/');
  const editorialInfo = getEditorialInfo();
  const footerColor = isEditorialRoute && editorialInfo?.corPrimaria
    ? editorialInfo.corPrimaria
    : currentStation.color || '#132D52';

  return (
    <footer
      className="flex items-center text-white py-6 mt-8 transition-colors duration-300"
      style={{ backgroundColor: footerColor }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="font-bold">GTF</span>
              <span className="font-bold">NEWS</span>
            </div>
            <p className="text-sm text-white/70 font-bold">
              Seu portal de notícias com cobertura completa do Brasil e do mundo.
            </p>
          </div>
        </div>

        <div className="items-center border-t border-white/20 mt-6 pt-6 text-center text-sm text-white/80">
          <p>Copyright © {new Date().getFullYear()} GTF Inc. Todos os direitos reservados.</p>
          <div className="flex items-center justify-center mt-3">
            <ul className="flex items-center gap-5 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Avisos Legais</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
