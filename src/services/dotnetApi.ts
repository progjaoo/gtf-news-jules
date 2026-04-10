const BASE_URL = import.meta.env.VITE_DOTNET_URL || 'http://localhost:5091';

export interface PostApi {
  id: number;
  titulo: string;
  conteudo: string;
  subtitulo: string;
  slug: string;
  imagemCapaId: number;
  imagemCapaUrl?: string; 
  publicadoEm: string | null;
  editorial: string;
  subcategoria?: string;
  corTema: string;
  usuarioCriacaoId: number;
  usuarioCriacao: string;
  emissora: string;
  emissoraSlug?: string;
  cidade: string;
  totalVisualizacoes?: number;
}

export interface TemaEditorialApi {
  id: number;
  descricao: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  logo: string;
}

export interface SubcategoriaApi {
  id: number;
  nome: string;
  slug: string;
  editorialId: number;
}

export interface EditorialApi {
  id: number;
  tipoPostagem: string;
  temaEditorialId: number;
  emissoraId: number;
  emissoraNome?: string;
  subcategorias?: SubcategoriaApi[];
}

export interface RegiaoApi {
  id: number;
  nome: string;
}

export interface CidadeApi {
  id: number;
  nome: string;
  regiaoId?: number;
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


// dotnetApi.ts
export function resolveImageUrl(url?: string | null, id?: number | null): string {
  if (url) return url;

  if (id) return `${BASE_URL}/api/media/${id}/download`;

  return '/placeholder.svg';
}

export async function fetchPostsPublic(): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/public`);
  if (!res.ok) throw new Error(`Posts API error: ${res.status}`);
  return res.json();
}

export async function fetchDestaques(): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/destaques`);
  if (!res.ok) throw new Error(`Destaques API error: ${res.status}`);
  return res.json();
}

export async function fetchDestaques88Fm(): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/destaques88fm`);
  if (!res.ok) throw new Error(`Destaques 88 FM API error: ${res.status}`);
  return res.json();
}

export async function fetchDestaquesFatoPopular(): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/destaquesFatoPopular`);
  if (!res.ok) throw new Error(`Destaques Fato Popular API error: ${res.status}`);
  return res.json();
}

export async function fetchMaisLidas(emissoraId?: number, limit = 4, days = 7): Promise<PostApi[]> {
  const params = new URLSearchParams({
    limit: String(limit),
    days: String(days),
  });

  if (emissoraId) {
    params.set("emissoraId", String(emissoraId));
  }

  const res = await fetch(`${BASE_URL}/api/posts/mais-lidas?${params.toString()}`);
  if (!res.ok) throw new Error(`Mais Lidas API error: ${res.status}`);
  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<PostApi> {
  const res = await fetch(`${BASE_URL}/api/posts/slug/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`Post by slug API error: ${res.status}`);
  return res.json();
}

export async function registerPostView(postId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/posts/${postId}/visualizacao`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(`Registrar visualização API error: ${res.status}`);
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

export async function fetchFilteredPosts(dateFilter: number, orderBy: number): Promise<PostApi[]> {
  const res = await fetch(`${BASE_URL}/api/posts/filtro?dateFilter=${dateFilter}&orderBy=${orderBy}`);
  if (!res.ok) throw new Error(`Filter API error: ${res.status}`);
  return res.json();
}

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

export async function fetchEditoriais(): Promise<EditorialApi[]> {
  const res = await fetch(`${BASE_URL}/api/editorial/buscarTodos`);
  if (!res.ok) throw new Error(`Editoriais API error: ${res.status}`);
  return res.json();
}

export async function fetchEditoriaisByEmissora(emissoraId: number): Promise<EditorialApi[]> {
  const res = await fetch(`${BASE_URL}/api/editorial/emissora/${emissoraId}/buscarTodos`);
  if (!res.ok) throw new Error(`Editoriais por emissora API error: ${res.status}`);
  return res.json();
}

export async function fetchSubcategorias(): Promise<SubcategoriaApi[]> {
  const res = await fetch(`${BASE_URL}/api/subcategorias/buscarTodasSubcategorias`);
  if (!res.ok) throw new Error(`Subcategorias API error: ${res.status}`);
  return res.json();
}

export async function fetchRegioes(): Promise<RegiaoApi[]> {
  const res = await fetch(`${BASE_URL}/api/regiao/buscarTodos`);
  if (!res.ok) throw new Error(`Regiões API error: ${res.status}`);
  return res.json();
}

export async function fetchCidades(): Promise<CidadeApi[]> {
  const res = await fetch(`${BASE_URL}/api/cidade/buscarTodos`);
  if (!res.ok) throw new Error(`Cidades API error: ${res.status}`);
  return res.json();
}

// ─── Emissora ─── //
export async function fetchEmissora(id: number): Promise<EmissoraApi> {
  const res = await fetch(`${BASE_URL}/api/emissora/${id}/buscarPorId`);
  if (!res.ok) throw new Error(`Emissora API error: ${res.status}`);
  return res.json();
}
