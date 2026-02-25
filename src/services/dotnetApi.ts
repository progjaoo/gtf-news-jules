// Serviço centralizado para consumir a API .NET

const BASE_URL = import.meta.env.VITE_DOTNET_URL || 'http://localhost:5091';

// ─── Interfaces ───

export interface PostApi {
  id: number;
  titulo: string;
  conteudo: string;
  subtitulo: string;
  slug: string;
  imagem: string;
  publicadoEm: string | null;
  editorial: string;
  corTema: string;
  usuarioCriacaoId: number;
  usuarioCriacao: string;
  emissora: string;
  cidade: string;
}

export interface TemaEditorialApi {
  id: number;
  descricao: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  logo: string;
}

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

// ─── Posts ───

export async function fetchPostsPublic(): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/public`);
  if (!res.ok) throw new Error(`Posts API error: ${res.status}`);
  return res.json();
}

export async function fetchPostsByEditorial(editorialId: number): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/editorial/${editorialId}`);
  if (!res.ok) throw new Error(`Posts Editorial API error: ${res.status}`);
  return res.json();
}

export async function searchPosts(query: string): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Search API error: ${res.status}`);
  return res.json();
}

// ─── Temas Editoriais ───

export async function fetchAllTemasEditoriais(): Promise<TemaEditorialApi[]> {
  const res = await fetch(`${BASE_URL}/api/tema-editorial`);
  if (!res.ok) throw new Error(`Temas Editoriais API error: ${res.status}`);
  return res.json();
}

export async function fetchTemaEditorial(id: number): Promise<TemaEditorialApi> {
  const res = await fetch(`${BASE_URL}/api/tema-editorial/${id}`);
  if (!res.ok) throw new Error(`Tema Editorial API error: ${res.status}`);
  return res.json();
}

// ─── Emissora ───

export async function fetchEmissora(id: number): Promise<EmissoraApi> {
  const res = await fetch(`${BASE_URL}/api/emissora/${id}/buscarPorId`);
  if (!res.ok) throw new Error(`Emissora API error: ${res.status}`);
  return res.json();
}