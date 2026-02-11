// Serviço para consumir a API .NET de emissoras e editoriais

const DOTNET_BASE_URL = import.meta.env.VITE_DOTNET_URL || 'http://localhost:5091';

export interface EmissoraApi {
  id: number;
  nomeSocial: string;
  razaoSocial: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  estado: string;
  cidade: string;
  slug: string | null;
  logo: string;
  logoSmall: string;
  temaPrincipal: string;
  ativa: boolean;
}

export interface TemaEditorialApi {
  id: number;
  descricao: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  logo: string;
}

export async function fetchEmissora(id: number): Promise<EmissoraApi> {
  const res = await fetch(`${DOTNET_BASE_URL}/api/emissora/${id}/buscarPorId`);
  if (!res.ok) throw new Error(`Emissora API error: ${res.status}`);
  return res.json();
}

export async function fetchTemaEditorial(id: number): Promise<TemaEditorialApi> {
  const res = await fetch(`${DOTNET_BASE_URL}/api/tema-editorial/${id}`);
  if (!res.ok) throw new Error(`Tema Editorial API error: ${res.status}`);
  return res.json();
}

export async function fetchAllTemasEditoriais(): Promise<TemaEditorialApi[]> {
  const res = await fetch(`${DOTNET_BASE_URL}/api/tema-editorial`);
  if (!res.ok) throw new Error(`Temas Editoriais API error: ${res.status}`);
  return res.json();
}
