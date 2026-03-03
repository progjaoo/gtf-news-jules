import React, { useState, useMemo } from 'react';
import { 
  Menu, ChevronDown, ChevronRight, 
  Newspaper, Settings, Home, Clock, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  fetchEditoriais, fetchSubcategorias, fetchAllTemasEditoriais,
  fetchRegioes, fetchCidades
} from '@/services/dotnetApi';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/* --------------------------------------------------------------
   INTERFACE BASE DO MENU – será usada quando vier da API
---------------------------------------------------------------- */
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: MenuItem[];       // Subníveis (editorias → sub-tópicos)
}

/* --------------------------------------------------------------
   COMPONENTE RECURSIVO DO MENU
   Abre e fecha níveis de forma automática
---------------------------------------------------------------- */
function MenuItemComponent({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div>
      {/* BOTÃO PRINCIPAL */}
      <button
        onClick={handleClick}
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: editoriais } = useQuery({
    queryKey: ['editoriais'],
    queryFn: fetchEditoriais
  });

  const { data: subcategorias } = useQuery({
    queryKey: ['subcategorias'],
    queryFn: fetchSubcategorias
  });

  const { data: temas } = useQuery({
    queryKey: ['temas-editoriais'],
    queryFn: fetchAllTemasEditoriais
  });

  const { data: regioes } = useQuery({
    queryKey: ['regioes'],
    queryFn: fetchRegioes
  });

  const { data: cidades } = useQuery({
    queryKey: ['cidades'],
    queryFn: fetchCidades
  });

  const menuItems: MenuItem[] = useMemo(() => {
    const baseItems: MenuItem[] = [
      {
        id: 'home',
        label: 'Início',
        icon: <Home size={18} />,
        onClick: () => {
          navigate('/');
          setOpen(false);
        }
      }
    ];

    if (editoriais && temas) {
      const editoriasMenu: MenuItem = {
        id: 'editorias',
        label: 'Editorias',
        icon: <Newspaper size={18} />,
        children: editoriais.map(ed => {
          const tema = temas.find(t => t.id === ed.temaEditorialId);
          // Try to get subcategories from the editorial object first, then fallback to global list
          const edSubcats = ed.subcategorias || subcategorias?.filter(s => s.editorialId === ed.id) || [];

          return {
            id: `ed-${ed.id}`,
            label: tema?.descricao || ed.tipoPostagem,
            onClick: () => {
              navigate(`/editorial/${ed.id}`);
              setOpen(false);
            },
            children: edSubcats.map(sub => ({
              id: `sub-${sub.id}`,
              label: sub.nome,
              onClick: () => {
                navigate(`/editorial/${ed.id}?sub=${sub.id}`);
                setOpen(false);
              }
            }))
          };
        })
      };
      baseItems.push(editoriasMenu);
    }

    if (regioes) {
      const regioesMenu: MenuItem = {
        id: 'regioes',
        label: 'Regiões',
        icon: <MapPin size={18} />,
        children: regioes.map(reg => ({
          id: `reg-${reg.id}`,
          label: reg.nome,
          children: cidades?.filter(c => c.regiaoId === reg.id).map(cid => ({
            id: `cid-${cid.id}`,
            label: cid.nome,
            onClick: () => {
              // Navigation for city could be implemented later
              navigate(`/busca?q=${encodeURIComponent(cid.nome)}`);
              setOpen(false);
            }
          }))
        }))
      };
      baseItems.push(regioesMenu);
    }

    baseItems.push(
      {
        id: 'ultimas',
        label: 'Últimas Notícias',
        icon: <Clock size={18} />,
        onClick: () => {
          navigate('/busca?orderBy=0');
          setOpen(false);
        }
      },
      {
        id: 'configuracoes',
        label: 'Configurações',
        icon: <Settings size={18} />,
        onClick: () => {
          setOpen(false);
        }
      }
    );

    return baseItems;
  }, [editoriais, subcategorias, temas, regioes, cidades, navigate]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <nav className="py-2 overflow-y-auto max-h-[calc(100vh-72px)]">
          {menuItems.map((item) => (
            <MenuItemComponent key={item.id} item={item} />
          ))}
        </nav>

      </SheetContent>
    </Sheet>
  );
}
