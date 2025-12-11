import React, { createContext, useContext, useState, ReactNode } from 'react';

export type EditorialType = 
  | 'noticias' 
  | 'nacional' 
  | 'esportes' 
  | 'negocios' 
  | 'inovacao' 
  | 'cultura' 
  | 'servicos';

interface EditorialInfo {
  id: EditorialType;
  label: string;
  color: string;
  subtopico?: string;
}

export const editorials: EditorialInfo[] = [
  { id: 'nacional', label: 'NACIONAL', color: 'bg-editorial-nacional', subtopico: 'SUBTÓPICO' },
  { id: 'esportes', label: 'ESPORTES', color: 'bg-editorial-esportes', subtopico: 'SUBTÓPICO' },
  { id: 'negocios', label: 'NEGÓCIOS', color: 'bg-editorial-negocios', subtopico: 'SUBTÓPICO' },
  { id: 'inovacao', label: 'INOVAÇÃO', color: 'bg-editorial-inovacao', subtopico: 'SUBTÓPICO' },
  { id: 'cultura', label: 'CULTURA', color: 'bg-editorial-cultura', subtopico: 'SUBTÓPICO' },
  { id: 'servicos', label: 'SERVIÇOS', color: 'bg-editorial-servicos', subtopico: 'SUBTÓPICO' },
];

interface EditorialContextType {
  currentEditorial: EditorialType;
  setEditorial: (editorial: EditorialType) => void;
  getEditorialClass: () => string;
  getEditorialLabel: () => string;
  getEditorialInfo: () => EditorialInfo | undefined;
}

const EditorialContext = createContext<EditorialContextType | undefined>(undefined);

export function EditorialProvider({ children }: { children: ReactNode }) {
  const [currentEditorial, setCurrentEditorial] = useState<EditorialType>('noticias');

  const setEditorial = (editorial: EditorialType) => {
    setCurrentEditorial(editorial);
  };

  const getEditorialClass = () => `editorial-${currentEditorial}`;

  const getEditorialLabel = () => {
    const info = editorials.find(e => e.id === currentEditorial);
    return info?.label || 'NOTÍCIAS';
  };

  const getEditorialInfo = () => editorials.find(e => e.id === currentEditorial);

  return (
    <EditorialContext.Provider 
      value={{ 
        currentEditorial, 
        setEditorial, 
        getEditorialClass, 
        getEditorialLabel,
        getEditorialInfo 
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
