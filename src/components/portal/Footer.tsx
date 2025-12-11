import React from 'react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-lg font-bold">GTF</span>
              <span className="text-lg font-bold text-primary">NEWS</span>
            </div>
            <p className="text-sm text-background/70">
              Seu portal de notícias com cobertura completa do Brasil e do mundo.
            </p>
          </div>

          {/* Editorias */}
          <div>
            <h4 className="font-bold mb-4">Editorias</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Nacional</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Esportes</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Negócios</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Inovação</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cultura</a></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-bold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Anuncie</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Termos de uso</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Política de privacidade</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} GTF News. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
