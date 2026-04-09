import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAllTemasEditoriais,
  fetchEditoriais,
  fetchEditoriaisByEmissora,
  TemaEditorialApi,
  EditorialApi,
} from '@/services/dotnetApi';
import { useStation, StationType } from '@/contexts/StationContext';

export type EditorialType = string;

export interface EditorialInfo {
  id: EditorialType;
  apiId: number;
  label: string;
  color: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  subtopico?: string;
  isLink?: boolean;
  linkTo?: string;
}

const stationApiIds: Record<StationType, number> = {
  radio88fm: 1,
  gtfnews: 4,
  fatopopular: 5,
};

function normalizeText(value?: string | null) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function slugifyEditorialId(value?: string | null) {
  const normalized = normalizeText(value);
  return normalized.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'noticias';
}

function mapEditorial(
  editorial: EditorialApi,
  themesById: Map<number, TemaEditorialApi>,
  currentStationId: StationType,
): EditorialInfo {
  const theme = themesById.get(editorial.temaEditorialId);
  const normalizedName = normalizeText(editorial.tipoPostagem);
  const isFatoPopularLink = currentStationId === 'radio88fm' && normalizedName === 'fato popular';

  return {
    id: slugifyEditorialId(editorial.tipoPostagem),
    apiId: editorial.id,
    label: editorial.tipoPostagem.toUpperCase(),
    color: '',
    corPrimaria: theme?.corPrimaria || '#E83C25',
    corSecundaria: theme?.corSecundaria || '#E83C25',
    corFonte: theme?.corFonte || '#FFFFFF',
    isLink: isFatoPopularLink,
    linkTo: isFatoPopularLink ? '/fatopopular' : undefined,
  };
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
  resolveEditorialColor: (editorialName?: string, fallbackColor?: string) => string;
}

const EditorialContext = createContext<EditorialContextType | undefined>(undefined);

export function EditorialProvider({ children }: { children: ReactNode }) {
  const [currentEditorial, setCurrentEditorial] = useState<EditorialType>('noticias');
  const { currentStation } = useStation();

  const stationId = currentStation.id as StationType;
  const currentStationApiId = currentStation.apiData?.id || stationApiIds[stationId];

  const { data: apiEditorials } = useQuery({
    queryKey: ['editoriais', 'all'],
    queryFn: fetchEditoriais,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const { data: stationEditorialsApi } = useQuery({
    queryKey: ['editoriais', 'emissora', currentStationApiId],
    queryFn: () => fetchEditoriaisByEmissora(currentStationApiId),
    enabled: !!currentStationApiId,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const { data: apiThemes } = useQuery({
    queryKey: ['temas-editoriais'],
    queryFn: fetchAllTemasEditoriais,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const themesById = useMemo(
    () => new Map((apiThemes || []).map((theme) => [theme.id, theme])),
    [apiThemes]
  );

  const editorials = useMemo(
    () => (stationEditorialsApi || []).map((editorial) => mapEditorial(editorial, themesById, stationId)),
    [stationEditorialsApi, themesById, stationId]
  );

  const allEditorials = useMemo(
    () => (apiEditorials || []).map((editorial) => mapEditorial(editorial, themesById, stationId)),
    [apiEditorials, themesById, stationId]
  );

  useEffect(() => {
    if (!editorials.length) return;

    const exists = editorials.some((editorial) => editorial.id === currentEditorial);
    if (!exists) {
      setCurrentEditorial(editorials[0].id);
    }
  }, [editorials, currentEditorial]);

  const setEditorial = (editorial: EditorialType) => {
    setCurrentEditorial(editorial);
    const info = allEditorials.find((item) => item.id === editorial);
    if (info?.corPrimaria) {
      document.documentElement.style.setProperty('--editorial-active-color', info.corPrimaria);
    }
  };

  const getEditorialClass = () => `editorial-${currentEditorial}`;

  const getEditorialLabel = () => {
    const info = editorials.find((item) => item.id === currentEditorial);
    return info?.label || 'NOTÍCIAS';
  };

  const getEditorialInfo = () => editorials.find((item) => item.id === currentEditorial);

  const getEditorialColor = (type: EditorialType) => {
    const info = allEditorials.find((item) => item.id === type);
    return info?.corPrimaria || '#E83C25';
  };

  const getEditorialByApiId = (apiId: number) => {
    return allEditorials.find((item) => item.apiId === apiId);
  };

  const resolveEditorialColor = (editorialName?: string, fallbackColor?: string) => {
    if (editorialName) {
      const normalizedName = normalizeText(editorialName);
      const match = allEditorials.find((item) => normalizeText(item.label) === normalizedName);
      if (match) return match.corPrimaria;
    }

    return fallbackColor || currentStation.color || '#038CE4';
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
        allEditorials,
        getEditorialColor,
        getEditorialByApiId,
        resolveEditorialColor,
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
