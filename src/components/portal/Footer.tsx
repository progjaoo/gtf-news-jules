import { useStation } from '@/contexts/StationContext';
import React from 'react';

export function Footer() {
  // const { currentStation } = useStation();
  return (
    <footer className="bg-foreground flex items-center text-background py-12 mt-12" >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className=" font-bold">GTF</span>
              <span className="font-bold">NEWS</span>
            </div>
            <p className="text-sm text-background/70 font-bold">
              Seu portal de notícias com cobertura completa do Brasil e do mundo.
            </p>
          </div>

          {/* Editorias */}
          {/* <div>
            <h4 className="font-white mb-3">Editoriais</h4>
            <ul className="space-y-2 text-sm text-background/80 font-bold">
              <li><a href="#" className="hover:text-background transition-colors">Nacional</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Esportes</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Negócios</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Inovação</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cultura</a></li>
            </ul>
          </div> */}

          {/* Institucional */}
          {/* <div>
            <h4 className="font-white mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-background/80 font-bold">
              <li><a href="#" className="hover:text-background transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Anuncie</a></li>
            </ul>
          </div> */}

          {/* Legal */}
          
        </div>

        <div className="items-center border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/80">
          <p>Copyright © {new Date().getFullYear()} GTF Inc. Todos os direitos reservados.</p>
          <div className="flex items-center justify-center mt-4">
            <ul className="flex items-center gap-5 text-sm text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">Termos de uso</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Política de privacidade</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Avisos Legais</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
