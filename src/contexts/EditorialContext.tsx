import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllTemasEditoriais, TemaEditorialApi } from '@/services/dotnetApi';
import { useStation, StationType } from '@/contexts/StationContext';

export type EditorialType = 
  | 'noticias' 
  | 'esportes' 
  | 'negocios' 
  | 'nacional' 
  | 'inovacao' 
  | 'cultura' 
  | 'servicos'
  | 'receitas'
  | 'musica'
  | 'enquete'
  | 'debates'
  | 'fatopopular';

interface EditorialInfo {
  id: EditorialType;
  apiId: number; // ID na API para requisições
  label: string;
  color: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  subtopico?: string;
  isLink?: boolean; // se true, navega para outra rota ao invés de /editorial/:id
  linkTo?: string;
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
  'Receitas': 'receitas',
  'Musica': 'musica',
  'Enquete': 'enquete',
  'Debates': 'debates',
};

// Editoriais do Fato Popular (portal de notícias)
const fatoPopularEditorials: EditorialInfo[] = [
  { id: 'noticias', apiId: 1, label: 'NOTÍCIAS', color: 'bg-editorial-noticias', corPrimaria: '#E83C25', corSecundaria: '#E83C25', corFonte: '#FFFFFF' },
  { id: 'esportes', apiId: 2, label: 'ESPORTES', color: 'bg-editorial-esportes', corPrimaria: '#06AA48', corSecundaria: '#06AA48', corFonte: '#FFFFFF' },
  { id: 'negocios', apiId: 3, label: 'NEGÓCIOS', color: 'bg-editorial-negocios', corPrimaria: '#FF8000', corSecundaria: '#FF8000', corFonte: '#FFFFFF' },
  { id: 'nacional', apiId: 4, label: 'NACIONAL', color: 'bg-editorial-nacional', corPrimaria: '#000000', corSecundaria: '#000000', corFonte: '#FFFFFF' },
  { id: 'inovacao', apiId: 5, label: 'INOVAÇÃO', color: 'bg-editorial-inovacao', corPrimaria: '#42CF00', corSecundaria: '#42CF00', corFonte: '#FFFFFF' },
  { id: 'cultura', apiId: 6, label: 'CULTURA', color: 'bg-editorial-cultura', corPrimaria: '#038CE4', corSecundaria: '#038CE4', corFonte: '#FFFFFF' },
  { id: 'servicos', apiId: 7, label: 'SERVIÇOS', color: 'bg-editorial-servicos', corPrimaria: '#FEC508', corSecundaria: '#FEC508', corFonte: '#FFFFFF' },
];

// Editoriais da Rádio 88 FM
const radio88fmEditorials: EditorialInfo[] = [
  { id: 'enquete', apiId: 11, label: 'ENQUETES', color: 'bg-editorial-noticias', corPrimaria: '#E83C25', corSecundaria: '#E83C25', corFonte: '#FFFFFF' },
  { id: 'debates', apiId: 12, label: 'DEBATES', color: 'bg-editorial-negocios', corPrimaria: '#FF8000', corSecundaria: '#FF8000', corFonte: '#FFFFFF' },
  { id: 'musica', apiId: 10, label: 'MÚSICA', color: 'bg-editorial-cultura', corPrimaria: '#038CE4', corSecundaria: '#038CE4', corFonte: '#FFFFFF' },
  { id: 'fatopopular', apiId: 0, label: 'FATO POPULAR', color: 'bg-editorial-nacional', corPrimaria: '#132D52', corSecundaria: '#132D52', corFonte: '#FFFFFF', isLink: true, linkTo: '/fatopopular' },
  { id: 'receitas', apiId: 9, label: 'RECEITAS', color: 'bg-editorial-esportes', corPrimaria: '#06AA48', corSecundaria: '#06AA48', corFonte: '#FFFFFF' },
];

// Mapeamento de quais editoriais cada station usa
const stationEditorialSets: Record<StationType, EditorialInfo[]> = {
  radio88fm: radio88fmEditorials,
  fatopopular: fatoPopularEditorials,
  radio89maravilha: fatoPopularEditorials, // fallback
  gtfnews: fatoPopularEditorials, // fallback
};

function mapApiToEditorials(apiData: TemaEditorialApi[], stationId: StationType): EditorialInfo[] {
  const stationSet = stationEditorialSets[stationId];
  return stationSet.map((fallback) => {
    const apiMatch = apiData.find((t) => descToType[t.descricao] === fallback.id);
    if (apiMatch) {
      return {
        ...fallback,
        corPrimaria: apiMatch.corPrimaria,
        corSecundaria: apiMatch.corSecundaria,
        corFonte: apiMatch.corFonte,
      };
    }
    return fallback;
  });
}

interface EditorialContextType {
  currentEditorial: EditorialType;
  setEditorial: (editorial: EditorialType) => void;
  getEditorialClass: () => string;
  getEditorialLabel: () => string;
  getEditorialInfo: () => EditorialInfo | undefined;
  editorials: EditorialInfo[];
  allEditorials: EditorialInfo[];
  getEditorialColor: (type: EditorialType) => string;
  getEditorialByApiId: (apiId: number) => EditorialInfo | undefined;
}

const EditorialContext = createContext<EditorialContextType | undefined>(undefined);

export function EditorialProvider({ children }: { children: ReactNode }) {
  const [currentEditorial, setCurrentEditorial] = useState<EditorialType>('noticias');
  const { currentStation } = useStation();

  const { data: apiEditorials } = useQuery({
    queryKey: ['temas-editoriais'],
    queryFn: fetchAllTemasEditoriais,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const stationId = currentStation.id as StationType;
  const fallback = stationEditorialSets[stationId] || fatoPopularEditorials;
  const editorials = apiEditorials ? mapApiToEditorials(apiEditorials, stationId) : fallback;

  const setEditorial = (editorial: EditorialType) => {
    setCurrentEditorial(editorial);
    // Apply editorial color as CSS variable for dynamic theming
    const info = editorials.find(e => e.id === editorial);
    if (info?.corPrimaria) {
      document.documentElement.style.setProperty('--editorial-active-color', info.corPrimaria);
    }
  };

  const getEditorialClass = () => `editorial-${currentEditorial}`;

  const getEditorialLabel = () => {
    const info = editorials.find(e => e.id === currentEditorial);
    return info?.label || 'NOTÍCIAS';
  };

  const getEditorialInfo = () => editorials.find(e => e.id === currentEditorial);

  const allEditorialsList = [...fatoPopularEditorials, ...radio88fmEditorials];

  const getEditorialColor = (type: EditorialType) => {
    const info = allEditorialsList.find(e => e.id === type);
    return info?.corPrimaria || '#E83C25';
  };

  const getEditorialByApiId = (apiId: number) => {
    return allEditorialsList.find(e => e.apiId === apiId);
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
        allEditorials: allEditorialsList,
        getEditorialColor,
        getEditorialByApiId,
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
