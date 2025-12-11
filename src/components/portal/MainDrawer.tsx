import React, { useState } from 'react';
import { 
  Menu, ChevronDown, ChevronRight, 
  Newspaper, Settings, Home, Clock 
} from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/* --------------------------------------------------------------
   INTERFACE BASE DO MENU – será usada quando vier da API
---------------------------------------------------------------- */
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];       // Subníveis (editorias → sub-tópicos)
}

/* --------------------------------------------------------------
   DADOS ESTÁTICOS INICIAIS (até termos a API)
   Aqui ficarão editorias + subtópicos
   Quando a API estiver pronta, basta substituir por fetch()
---------------------------------------------------------------- */
const menuItems: MenuItem[] = [
  
  // Página inicial
  { id: 'home', label: 'Início', icon: <Home size={18} /> },

  // EDITORIA + subtópicos
  { 
    id: 'editorias',
    label: 'Editorias',
    icon: <Newspaper size={18} />,
    children: [
      {
        id: 'nacional',
        label: 'Nacional',
        children: [
          { id: 'politica-nacional', label: 'Política' },
          { id: 'economia-nacional', label: 'Economia' },
          { id: 'sociedade-nacional', label: 'Sociedade' },
          { id: 'seguranca-nacional', label: 'Segurança' },
        ]
      },
      {
        id: 'esportes',
        label: 'Esportes',
        children: [
          { id: 'futebol', label: 'Futebol' },
          { id: 'volei', label: 'Vôlei' },
          { id: 'basquete', label: 'Basquete' },
          { id: 'automobilismo', label: 'Automobilismo' },
        ]
      },
      {
        id: 'negocios',
        label: 'Negócios',
        children: [
          { id: 'mercado', label: 'Mercado' },
          { id: 'financas', label: 'Finanças' },
          { id: 'empresas', label: 'Empresas' },
          { id: 'startups', label: 'Startups' },
        ]
      },
      {
        id: 'inovacao',
        label: 'Inovação',
        children: [
          { id: 'tecnologia', label: 'Tecnologia' },
          { id: 'ciencia', label: 'Ciência' },
          { id: 'ia', label: 'Inteligência Artificial' },
          { id: 'gadgets', label: 'Gadgets' },
        ]
      },
      {
        id: 'cultura',
        label: 'Cultura',
        children: [
          { id: 'cinema', label: 'Cinema' },
          { id: 'musica', label: 'Música' },
          { id: 'arte', label: 'Arte' },
          { id: 'literatura', label: 'Literatura' },
        ]
      },
      {
        id: 'servicos',
        label: 'Serviços',
        children: [
          { id: 'utilidade', label: 'Utilidade Pública' },
          { id: 'clima', label: 'Clima' },
          { id: 'transito', label: 'Trânsito' },
          { id: 'vagas', label: 'Vagas de Emprego' },
        ]
      },
    ]
  },

  // Últimas notícias
  { id: 'ultimas', label: 'Últimas Notícias', icon: <Clock size={18} /> },

  // Configurações (tema, idioma etc)
  { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> },
];

/* --------------------------------------------------------------
   COMPONENTE RECURSIVO DO MENU
   Abre e fecha níveis de forma automática
---------------------------------------------------------------- */
function MenuItemComponent({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      {/* BOTÃO PRINCIPAL */}
      <button
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-left',
          'hover:bg-muted/50 transition-colors',
          level > 0 && 'pl-10 text-sm'   // Indentação de subníveis
        )}
      >
        
        <div className="flex items-center gap-3">
          {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
          <span className="font-medium text-foreground">{item.label}</span>
        </div>

        {/* Ícone abre/fecha submenu */}
        {hasChildren && (
          <span className="text-muted-foreground">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </button>
        
      {/* SUBMENU (recursivo) */}
      {hasChildren && isOpen && (
        <div className="bg-muted/30">
          {item.children!.map((child) => (
            <MenuItemComponent 
              key={child.id} 
              item={child} 
              level={level + 1}    // Add identação
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------
   COMPONENTE PRINCIPAL DO DRAWER
---------------------------------------------------------------- */
export function MainDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 text-white hover:text-foreground transition-colors" aria-label="Abrir menu">
          <Menu size={25} />
        </button>
        
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-0 bg-card">

        {/* HEADER DO MENU */}
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-left">
            <span className="text-sm font-bold text-foreground">GTF</span>
            <span className="text-sm font-bold text-primary">NEWS</span>
          </SheetTitle>
        </SheetHeader>

        {/* LISTA DO MENU */}
        <nav className="py-2">
          {menuItems.map((item) => (
            <MenuItemComponent key={item.id} item={item} />
          ))}
        </nav>

      </SheetContent>
    </Sheet>
  );
}
