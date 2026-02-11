import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllTemasEditoriais, TemaEditorialApi } from '@/services/dotnetApi';

export type EditorialType = 
  | 'noticias' 
  | 'esportes' 
  | 'negocios' 
  | 'nacional' 
  | 'inovacao' 
  | 'cultura' 
  | 'servicos';

interface EditorialInfo {
  id: EditorialType;
  label: string;
  color: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  subtopico?: string;
}

// Mapeamento descrição API → EditorialType
const descToType: Record<string, EditorialType> = {
  'Noticias': 'noticias',
  'Esportes': 'esportes',
  'Negocios': 'negocios',
  'Nacional': 'nacional',
  'Inovacao': 'inovacao',
  'Cultura': 'cultura',
  'Servicos': 'servicos',
};

// Fallback se API offline
const fallbackEditorials: EditorialInfo[] = [
  { id: 'noticias', label: 'NOTÍCIAS', color: 'bg-editorial-noticias', corPrimaria: '#E83C25', corSecundaria: '#E83C25', corFonte: '#FFFFFF' },
  { id: 'esportes', label: 'ESPORTES', color: 'bg-editorial-esportes', corPrimaria: '#06AA48', corSecundaria: '#06AA48', corFonte: '#FFFFFF' },
  { id: 'negocios', label: 'NEGÓCIOS', color: 'bg-editorial-negocios', corPrimaria: '#FF8000', corSecundaria: '#FF8000', corFonte: '#FFFFFF' },
  { id: 'nacional', label: 'NACIONAL', color: 'bg-editorial-nacional', corPrimaria: '#000000', corSecundaria: '#000000', corFonte: '#FFFFFF' },
  { id: 'inovacao', label: 'INOVAÇÃO', color: 'bg-editorial-inovacao', corPrimaria: '#42CF00', corSecundaria: '#42CF00', corFonte: '#FFFFFF' },
  { id: 'cultura', label: 'CULTURA', color: 'bg-editorial-cultura', corPrimaria: '#038CE4', corSecundaria: '#038CE4', corFonte: '#FFFFFF' },
  { id: 'servicos', label: 'SERVIÇOS', color: 'bg-editorial-servicos', corPrimaria: '#FEC508', corSecundaria: '#FEC508', corFonte: '#FFFFFF' },
];

function mapApiToEditorials(apiData: TemaEditorialApi[]): EditorialInfo[] {
  return apiData
    .map((t) => {
      const type = descToType[t.descricao];
      if (!type) return null;
      return {
        id: type,
        label: t.descricao.toUpperCase(),
        color: `bg-editorial-${type}`,
        corPrimaria: t.corPrimaria,
        corSecundaria: t.corSecundaria,
        corFonte: t.corFonte,
      } as EditorialInfo;
    })
    .filter(Boolean) as EditorialInfo[];
}

interface EditorialContextType {
  currentEditorial: EditorialType;
  setEditorial: (editorial: EditorialType) => void;
  getEditorialClass: () => string;
  getEditorialLabel: () => string;
  getEditorialInfo: () => EditorialInfo | undefined;
  editorials: EditorialInfo[];
  getEditorialColor: (type: EditorialType) => string;
}

const EditorialContext = createContext<EditorialContextType | undefined>(undefined);

export function EditorialProvider({ children }: { children: ReactNode }) {
  const [currentEditorial, setCurrentEditorial] = useState<EditorialType>('noticias');

  const { data: apiEditorials } = useQuery({
    queryKey: ['temas-editoriais'],
    queryFn: fetchAllTemasEditoriais,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const editorials = apiEditorials ? mapApiToEditorials(apiEditorials) : fallbackEditorials;

  const setEditorial = (editorial: EditorialType) => {
    setCurrentEditorial(editorial);
  };

  const getEditorialClass = () => `editorial-${currentEditorial}`;

  const getEditorialLabel = () => {
    const info = editorials.find(e => e.id === currentEditorial);
    return info?.label || 'NOTÍCIAS';
  };

  const getEditorialInfo = () => editorials.find(e => e.id === currentEditorial);

  const getEditorialColor = (type: EditorialType) => {
    const info = editorials.find(e => e.id === type);
    return info?.corPrimaria || '#E83C25';
  };

  return (
    <EditorialContext.Provider 
      value={{ 
        currentEditorial, 
        setEditorial, 
        getEditorialClass, 
        getEditorialLabel,
        getEditorialInfo,
        editorials,
        getEditorialColor,
      }}
    >
      <div className={getEditorialClass()}>
        {children}
      </div>
    </EditorialContext.Provider>
  );
}

export function useEditorial() {
  const context = useContext(EditorialContext);
  if (context === undefined) {
    throw new Error('useEditorial must be used within an EditorialProvider');
  }
  return context;
}
