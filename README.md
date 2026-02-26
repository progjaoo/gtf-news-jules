# GTF News — Portal de Notícias Multi-Emissora

> Portal de notícias premium com identidade visual dinâmica, temas por emissora/editorial, consumo de API .NET Core e arquitetura componentizada para reaproveitamento em agents de IA.

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Arquitetura Geral](#arquitetura-geral)
5. [Roteamento](#roteamento)
6. [Contextos Globais (State Management)](#contextos-globais-state-management)
7. [Serviço de API (.NET)](#serviço-de-api-net)
8. [Hooks Customizados](#hooks-customizados)
9. [Componentes do Portal](#componentes-do-portal)
10. [Páginas](#páginas)
11. [Design System & Theming](#design-system--theming)
12. [Guia de Reaproveitamento para AI Agents](#guia-de-reaproveitamento-para-ai-agents)
13. [Como Rodar Localmente](#como-rodar-localmente)
14. [Variáveis de Ambiente](#variáveis-de-ambiente)
15. [Dependências Principais](#dependências-principais)

---

## Visão Geral

**GTF News** é um portal de notícias multi-emissora inspirado em portais como G1, com design editorial premium. O sistema suporta múltiplas emissoras de rádio/portais de notícias, cada uma com identidade visual própria (cores, logos, editorias).

### Entidades Principais

| Entidade | Descrição |
|----------|-----------|
| **Emissora (Station)** | Entidade raiz: Rádio 88 FM, 89 Maravilha, GTF News, Fato Popular |
| **Editorial** | Categorias temáticas: Notícias, Esportes, Cultura, etc. Cada emissora tem seu conjunto |
| **Post** | Artigo/notícia com título, conteúdo, imagem, editorial vinculado |
| **Tema Editorial** | Configuração visual (cores) de cada editorial |

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| **Framework** | React | ^18.3.1 |
| **Build** | Vite (SWC) | — |
| **Linguagem** | TypeScript | — |
| **CSS** | Tailwind CSS + Design Tokens HSL | — |
| **Roteamento** | React Router DOM | ^6.30.1 |
| **Estado Servidor** | TanStack React Query | ^5.83.0 |
| **UI Components** | shadcn/ui (Radix) | — |
| **Fonte** | Montserrat (Google Fonts) | — |
| **Backend** | API .NET Core (externa) | `http://localhost:5091` |

---

## Estrutura de Diretórios

```
src/
├── assets/                    # SVGs das logos das emissoras
│   ├── logoazul.svg           # Logo Rádio 88 FM
│   └── logomaravilha.svg      # Logo 89 Maravilha
│
├── components/
│   ├── portal/                # Componentes específicos do portal
│   │   ├── AdBanner.tsx       # Banner publicitário
│   │   ├── CategoryNav.tsx    # Navegação por editorias
│   │   ├── EditorialBar.tsx   # Barra principal (logo + menu + busca)
│   │   ├── EditorialSection.tsx # Seção de editorial com grid de notícias
│   │   ├── Footer.tsx         # Rodapé dinâmico
│   │   ├── HeroSection.tsx    # Hero principal com destaque + mais lidas
│   │   ├── MainDrawer.tsx     # Menu lateral (Sheet) recursivo
│   │   ├── NewsCard.tsx       # Card de notícia (small/medium/large/horizontal)
│   │   ├── NewsGrid.tsx       # Grid responsivo de NewsCards
│   │   ├── PostHorizontalCard.tsx # Card horizontal para listagens editoriais
│   │   ├── SearchBox.tsx      # Campo de busca com dropdown de resultados
│   │   ├── SectionHeader.tsx  # Cabeçalho de seção editorial
│   │   ├── StationSelector.tsx # Dropdown de troca de emissora
│   │   ├── StickyHeader.tsx   # Header fixo (TopHeader + EditorialBar + CategoryNav)
│   │   ├── TopHeader.tsx      # Barra superior (emissora + localização)
│   │   └── VerMaisButton.tsx  # Botão "Ver mais" padronizado
│   │
│   └── ui/                    # Componentes shadcn/ui (Radix primitives)
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── toast.tsx
│       └── ... (40+ componentes)
│
├── contexts/
│   ├── EditorialContext.tsx    # Contexto global de editorias e temas
│   ├── StationContext.tsx     # Contexto global de emissoras
│   └── StationRoute.tsx       # Wrapper de rota que define emissora ativa
│
├── hooks/
│   ├── useArticles.ts         # Hooks de dados: usePosts, usePostById, useSearchPosts
│   ├── useScrollHeader.ts    # Hook de controle de scroll do header
│   ├── use-mobile.tsx         # Detecção de mobile
│   └── use-toast.ts           # Hook de toast notifications
│
├── pages/
│   ├── Index.tsx              # Página inicial do Fato Popular
│   ├── Radio88FMPage.tsx      # Página inicial da Rádio 88 FM
│   ├── ArtigoPage.tsx         # Detalhe do artigo/notícia
│   ├── EditorialPage.tsx      # Listagem de posts por editorial
│   ├── SearchPage.tsx         # Página de busca dedicada
│   └── NotFound.tsx           # 404
│
├── services/
│   └── dotnetApi.ts           # Camada de comunicação com API .NET
│
├── lib/
│   └── utils.ts               # Utilitário cn() para classes Tailwind
│
├── App.tsx                    # Árvore de providers + rotas
├── main.tsx                   # Entry point
└── index.css                  # Design tokens, variáveis CSS, classes utilitárias
```

---

## Arquitetura Geral

```
┌──────────────────────────────────────────────────────────┐
│                        App.tsx                           │
│  QueryClientProvider → TooltipProvider → StationProvider │
│    → EditorialProvider → BrowserRouter → Routes          │
└──────────────────────────────────────────────────────────┘
         │                    │                │
    StationRoute         StationRoute     Rotas diretas
   (radio88fm)          (fatopopular)   (editorial, artigo,
         │                    │           busca, 404)
    Radio88FMPage         Index.tsx
         │                    │
    StickyHeader          StickyHeader
    (TopHeader +          (TopHeader +
     EditorialBar +        EditorialBar +
     CategoryNav)          CategoryNav)
```

### Fluxo de Dados

```
API .NET ──fetch──→ React Query cache ──→ Hook (usePosts, etc.)
                                              │
                                        Componente (Page)
                                              │
                                    ┌─────────┴─────────┐
                              StationContext      EditorialContext
                              (emissora ativa)    (editorial ativo)
                                    │                   │
                              CSS Variables        CSS Variables
                              (--station-color)    (--editorial-active-color)
                                    │                   │
                              Componentes visuais com cores dinâmicas
```

---

## Roteamento

Definido em `src/App.tsx`:

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `Navigate → /radio88fm` | Redirect padrão |
| `/radio88fm` | `StationRoute(radio88fm) → Radio88FMPage` | Home da Rádio 88 FM |
| `/fatopopular` | `StationRoute(fatopopular) → Index` | Home do Fato Popular |
| `/radio89maravilha` | `StationRoute(radio89maravilha) → Index` | Home da 89 Maravilha |
| `/gtfnews` | `StationRoute(gtfnews) → Index` | Home do GTF News |
| `/editorial/:editorialId` | `EditorialPage` | Listagem filtrada por editorial (apiId numérico) |
| `/noticia/:id` | `ArtigoPage` | Detalhe do artigo |
| `/busca` | `SearchPage` | Resultados de busca (`?q=termo`) |
| `*` | `NotFound` | 404 |

### StationRoute

Componente wrapper que sincroniza a emissora ativa no `StationContext` ao montar:

```tsx
export function StationRoute({ stationId, children }) {
  const { setStation } = useStation();
  useEffect(() => { setStation(stationId); }, [stationId]);
  return <>{children}</>;
}
```

---

## Contextos Globais (State Management)

### 1. StationContext (`src/contexts/StationContext.tsx`)

Gerencia a **emissora ativa** do portal.

#### Tipos

```typescript
type StationType = "radio88fm" | "radio89maravilha" | "gtfnews" | "fatopopular";

interface StationData {
  id: string;
  name: string;
  color: string;       // Cor hexadecimal da emissora
  homePath: string;    // Rota home da emissora
  apiData?: EmissoraApi; // Dados completos da API (opcional)
}
```

#### Mapeamento Station → API ID

| Station | API ID | Cor Padrão |
|---------|--------|-----------|
| `radio88fm` | 1 | `#038CE4` (Azul) |
| `radio89maravilha` | 4 | `#FF8000` (Laranja) |
| `gtfnews` | 4 | `#000000` (Preto) |
| `fatopopular` | 5 | `#132D52` (Azul Escuro) |

#### API Exposta

```typescript
const { currentStation, setStation } = useStation();
// currentStation.id, currentStation.name, currentStation.color, currentStation.homePath
```

#### Funcionalidade

- Busca dados da emissora via API (`/api/emissora/{id}/buscarPorId`)
- Aplica dados da API (nome, cor) quando disponíveis
- Fallback para dados locais se API offline
- Injeta `--station-color` como CSS variable no DOM

---

### 2. EditorialContext (`src/contexts/EditorialContext.tsx`)

Gerencia o **editorial ativo** e fornece o catálogo de editorias por emissora.

#### Tipos

```typescript
type EditorialType = 'noticias' | 'esportes' | 'negocios' | 'nacional' | 'inovacao' 
                   | 'cultura' | 'servicos' | 'receitas' | 'musica' | 'enquete' 
                   | 'debates' | 'fatopopular';

interface EditorialInfo {
  id: EditorialType;
  apiId: number;        // ID para chamadas à API
  label: string;        // Label exibido na UI
  color: string;        // Classe Tailwind de cor
  corPrimaria: string;  // Cor hex primária
  corSecundaria: string;
  corFonte: string;
  isLink?: boolean;     // Se navega para outra rota ao invés de /editorial/:id
  linkTo?: string;
}
```

#### Editorias por Emissora

**Fato Popular** (portal de notícias clássico):

| Editorial | API ID | Cor | Hex |
|-----------|--------|-----|-----|
| Notícias | 1 | Vermelho | `#E83C25` |
| Esportes | 2 | Verde | `#06AA48` |
| Negócios | 3 | Laranja | `#FF8000` |
| Nacional | 4 | Preto | `#000000` |
| Inovação | 5 | Verde Claro | `#42CF00` |
| Cultura | 6 | Azul | `#038CE4` |
| Serviços | 7 | Amarelo | `#FEC508` |

**Rádio 88 FM** (programas da rádio):

| Editorial | API ID | Cor | Hex |
|-----------|--------|-----|-----|
| Enquetes | 11 | Vermelho | `#E83C25` |
| Debates | 12 | Laranja | `#FF8000` |
| Música | 10 | Azul | `#038CE4` |
| Fato Popular | — | Azul Escuro (link direto) | `#132D52` |
| Receitas | 9 | Verde | `#06AA48` |

#### API Exposta

```typescript
const {
  currentEditorial,     // EditorialType ativo
  setEditorial,         // Muda editorial + aplica cor CSS
  getEditorialClass,    // Retorna 'editorial-{type}' para classes CSS
  getEditorialLabel,    // Label do editorial ativo
  getEditorialInfo,     // EditorialInfo completo do ativo
  editorials,           // Array de editoriais da emissora atual
  allEditorials,        // Todos os editoriais (todas emissoras)
  getEditorialColor,    // Cor hex por EditorialType
  getEditorialByApiId,  // Busca editorial por API ID
} = useEditorial();
```

#### Comportamento de Theming Dinâmico

Quando `setEditorial(type)` é chamado:
1. Atualiza o estado `currentEditorial`
2. Injeta `--editorial-active-color` no `document.documentElement`
3. Aplica classe CSS `editorial-{type}` que sobrescreve `--primary` no Tailwind

---

## Serviço de API (.NET)

**Arquivo**: `src/services/dotnetApi.ts`

### Configuração

```typescript
const BASE_URL = import.meta.env.VITE_DOTNET_URL || 'http://localhost:5091';
```

### Interfaces de Dados

```typescript
// Post/Notícia
interface PostApi {
  id: number;
  titulo: string;
  conteudo: string;
  subtitulo: string;
  slug: string;
  imagem: string;          // Caminho relativo ou absoluto da imagem
  publicadoEm: string | null;
  editorial: string;       // Nome textual do editorial
  corTema: string;         // Cor hex do tema
  usuarioCriacaoId: number;
  usuarioCriacao: string;
  emissora: string;
  cidade: string;
}

// Tema Editorial (cores e branding)
interface TemaEditorialApi {
  id: number;
  descricao: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  logo: string;
}

// Emissora (dados institucionais)
interface EmissoraApi {
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
```

### Endpoints

| Função | Método | Endpoint | Descrição |
|--------|--------|----------|-----------|
| `fetchPostsPublic()` | GET | `/api/posts/public` | Todos os posts públicos |
| `fetchPostsByEditorial(id)` | GET | `/api/posts/editorial/{id}` | Posts filtrados por editorial |
| `searchPosts(query)` | GET | `/api/posts/search?query={q}` | Busca textual |
| `fetchAllTemasEditoriais()` | GET | `/api/tema-editorial` | Todos os temas |
| `fetchTemaEditorial(id)` | GET | `/api/tema-editorial/{id}` | Tema específico |
| `fetchEmissora(id)` | GET | `/api/emissora/{id}/buscarPorId` | Dados da emissora |

### Utilitário de Imagem

```typescript
// Resolve caminhos relativos da API para URLs absolutas
function resolveImageUrl(imagem?: string | null): string
// - null/undefined → '/placeholder.svg'
// - URLs absolutas (http/https) → retorna como está
// - Caminhos relativos → prepend BASE_URL
```

---

## Hooks Customizados

### `useArticles.ts` — Hooks de Dados

| Hook | Parâmetros | Retorno | Cache |
|------|-----------|---------|-------|
| `usePosts()` | — | `PostApi[]` | 5 min |
| `usePostById(id)` | `number` | `PostApi \| undefined` | 5 min |
| `usePostsByEditorial(editorialId)` | `number` | `PostApi[]` | 5 min |
| `useSearchPosts(query)` | `string` (min 2 chars) | `PostApi[]` | 2 min |

**`usePostById`** tem lógica de fallback: busca primeiro em posts públicos, depois varre todos os editoriais conhecidos (IDs 1-12) até encontrar.

### `useScrollHeader.ts` — Controle de Scroll

```typescript
const { showTop } = useScrollHeader();
// showTop: boolean — true quando scrollY < 20, false quando > 80
// Usa requestAnimationFrame + hysteresis para evitar flickering
```

---

## Componentes do Portal

### Hierarquia Visual

```
┌─────────────────────────────────────────┐
│ TopHeader (emissora + "BRASIL" + local) │ ← Oculta ao rolar
├─────────────────────────────────────────┤
│ EditorialBar (menu + logo + busca)      │ ← Fixo
├─────────────────────────────────────────┤
│ CategoryNav (links das editorias)       │ ← Fixo
├─────────────────────────────────────────┤
│ Conteúdo da página                      │
├─────────────────────────────────────────┤
│ Footer (dinâmico, acompanha tema)       │
└─────────────────────────────────────────┘
```

### Catálogo de Componentes

#### `StickyHeader`
- **Arquivo**: `src/components/portal/StickyHeader.tsx`
- **Responsabilidade**: Compõe TopHeader + EditorialBar + CategoryNav em bloco sticky `top-0 z-50`
- **Comportamento**: TopHeader desaparece com scroll (via `useScrollHeader`), EditorialBar e CategoryNav fixos
- **Dependências**: `TopHeader`, `EditorialBar`, `CategoryNav`, `useScrollHeader`

#### `TopHeader`
- **Arquivo**: `src/components/portal/TopHeader.tsx`
- **Responsabilidade**: Barra superior com seletor de emissora e localização
- **Theming**: Texto "BRASIL" usa cor do editorial ativo (em páginas de editorial/artigo) ou da emissora
- **Dependências**: `StationSelector`, `useStation`, `useEditorial`

#### `EditorialBar`
- **Arquivo**: `src/components/portal/EditorialBar.tsx`
- **Responsabilidade**: Barra principal colorida com menu hamburger, logo centralizada e busca
- **Theming**: Background dinâmico — cor do editorial ativo ou cor da emissora
- **Layout**: Menu (esquerda, 90px) → Logo (centro absoluto) → Busca (direita, 90px)
- **Logos**: Mapeamento `stationLogos` com SVGs por emissora
- **Dependências**: `MainDrawer`, `SearchBox`, `useStation`, `useEditorial`

#### `CategoryNav`
- **Arquivo**: `src/components/portal/CategoryNav.tsx`
- **Responsabilidade**: Navegação horizontal pelas editorias da emissora atual
- **Comportamento**: Clique navega para `/editorial/{apiId}`. Editorias com `isLink=true` navegam para rota custom (ex: Fato Popular)
- **Visual**: Indicador colorido (bolinha) + label, opacidade diferenciada para editorial ativo
- **Dependências**: `useEditorial`, `useNavigate`

#### `NewsCard`
- **Arquivo**: `src/components/portal/NewsCard.tsx`
- **Responsabilidade**: Card de notícia reutilizável com 4 variantes visuais
- **Props**: `news: PostApi`, `variant: 'small' | 'medium' | 'large' | 'horizontal'`, `showImage`, `showSubtitle`, `className`
- **Features**: Indicador colorido do editorial, `resolveImageUrl()` para imagens, hover com cor primária
- **Dependências**: `resolveImageUrl`, `useNavigate`

#### `PostHorizontalCard`
- **Arquivo**: `src/components/portal/PostHorizontalCard.tsx`
- **Responsabilidade**: Card horizontal grande para listagens editoriais
- **Layout**: Imagem (272px, esquerda) + Conteúdo (direita: data, título, subtítulo)
- **Features**: Data formatada em pt-BR (date-fns), hover scale na imagem
- **Dependências**: `resolveImageUrl`, `date-fns`, `useNavigate`

#### `NewsGrid`
- **Arquivo**: `src/components/portal/NewsGrid.tsx`
- **Responsabilidade**: Grid responsivo de NewsCards
- **Props**: `news: PostApi[]`, `columns: 1 | 2 | 3 | 4`
- **Breakpoints**: Automáticos via Tailwind (1 col mobile → `columns` desktop)

#### `HeroSection`
- **Arquivo**: `src/components/portal/HeroSection.tsx`
- **Responsabilidade**: Seção hero da home com destaque principal + "Mais Lidas"
- **Layout**: Grid 8/4 (desktop) — artigo destaque à esquerda, sidebar de mais lidas à direita
- **Features**: Imagem com hover scale, badge editorial, título com cor do tema

#### `SearchBox`
- **Arquivo**: `src/components/portal/SearchBox.tsx`
- **Responsabilidade**: Busca inline com dropdown de resultados
- **Fluxo**: Ícone → Expande input → Digita (min 2 chars) → Dropdown com até 5 resultados → Enter vai para `/busca?q=...`
- **Features**: Click outside fecha, loading spinner, link "Ver todos os resultados"

#### `MainDrawer`
- **Arquivo**: `src/components/portal/MainDrawer.tsx`
- **Responsabilidade**: Menu lateral responsivo com navegação recursiva em 3 níveis
- **Implementação**: shadcn `Sheet` (slide-in) + componente recursivo `MenuItemComponent`
- **Estrutura**: Início → Editorias (com filhos: Nacional, Esportes, etc.) → Subtópicos (Política, Futebol, etc.)

#### `StationSelector`
- **Arquivo**: `src/components/portal/StationSelector.tsx`
- **Responsabilidade**: Dropdown de troca de emissora
- **Visual**: Nome da emissora com cor temática + chevron → DropdownMenu com todas as emissoras
- **Ação**: Navega para `station.homePath` ao selecionar

#### `Footer`
- **Arquivo**: `src/components/portal/Footer.tsx`
- **Responsabilidade**: Rodapé com cor dinâmica que acompanha o tema ativo
- **Theming**: Background = cor do editorial (em páginas de editorial/artigo) ou cor da emissora
- **Conteúdo**: Branding GTF News + links institucionais + copyright

#### `SectionHeader`
- **Arquivo**: `src/components/portal/SectionHeader.tsx`
- **Responsabilidade**: Cabeçalho de seção com barra vertical colorida
- **Props**: `title: string`, `editorial: EditorialType`
- **Visual**: Barra vertical (1px × 24px) com cor do editorial + título bold

#### `AdBanner`
- **Arquivo**: `src/components/portal/AdBanner.tsx`
- **Responsabilidade**: Banner publicitário placeholder
- **Visual**: Retângulo 1250px × 177px com cor da emissora + texto "ANUNCIE AQUI"

#### `VerMaisButton`
- **Arquivo**: `src/components/portal/VerMaisButton.tsx`
- **Responsabilidade**: Botão padronizado "Ver mais" com ícone de seta
- **Props**: `label`, `onClick`, `size: 'full' | 'medium'`
- **Tamanhos**: `full` = 1000px, `medium` = 400px

---

## Páginas

### `Index.tsx` — Home do Fato Popular

- **Rota**: `/fatopopular`, `/radio89maravilha`, `/gtfnews`
- **Seções**: Hero → Grid de notícias → Negócios (full) → Nacional + Cultura + Esportes (3 colunas) → AdBanner
- **Dados**: `usePosts()` → filtra por editorial via campo `post.editorial`
- **Navegação**: Botões "Ver mais" navegam para `/editorial/{apiId}`

### `Radio88FMPage.tsx` — Home da Rádio 88 FM

- **Rota**: `/radio88fm`
- **Seções**: Hero grid 3×2 (posts dos 4 editoriais da rádio) → Seção "gatilho" Fato Popular (Cultura, Notícias, Esportes) → Botão "Ver mais no Fato Popular"
- **Dados**: `usePostsByEditorial(9)`, `usePostsByEditorial(10)`, `usePostsByEditorial(11)`, `usePostsByEditorial(12)` combinados
- **Componente interno**: `HeroCard` com cor dinâmica por editorial

### `ArtigoPage.tsx` — Detalhe do Artigo

- **Rota**: `/noticia/:id`
- **Layout**: Grid 2 colunas (desktop) — Conteúdo (esquerda) + Sidebar "Veja também" (direita, sticky)
- **Persistência de tema**: `useEffect` sincroniza editorial ativo via `setEditorial()` ao carregar artigo
- **Resolução de cor**: `resolveEditorialColor()` cruza nome do editorial do post com `allEditorials` do contexto
- **Features**: Badge editorial colorido, meta (data, autor, cidade), compartilhamento (WhatsApp + Web Share API), conteúdo HTML renderizado, seção de comentários (placeholder)

### `EditorialPage.tsx` — Listagem por Editorial

- **Rota**: `/editorial/:editorialId` (apiId numérico)
- **Dados**: `usePostsByEditorial(numericId)`
- **Theming**: Sincroniza editorial ativo via `setEditorial()` para colorir header/footer
- **Visual**: Título do editorial com barra colorida + lista de `PostHorizontalCard`

### `SearchPage.tsx` — Busca

- **Rota**: `/busca?q=termo`
- **Layout diferenciado**: Sem EditorialBar/CategoryNav — apenas TopHeader simplificado + barra de busca com logo da emissora
- **Dados**: `useSearchPosts(q)` (React Query, min 2 chars)
- **Visual**: Cards de resultado com imagem + metadados, filtros visuais (todos / mais recentes)

---

## Design System & Theming

### Variáveis CSS (index.css)

O sistema usa **CSS Custom Properties em HSL** para theming dinâmico:

```css
:root {
  /* Base */
  --background: 0 0% 98%;
  --foreground: 220 15% 15%;
  --primary: 203 98% 45%;        /* Cor principal — muda por editorial/emissora */
  
  /* Editorias */
  --editorial-noticias: 8 81% 53%;       /* #E83C25 */
  --editorial-esportes: 145 93% 34%;     /* #06AA48 */
  --editorial-negocios: 30 100% 50%;     /* #FF8000 */
  --editorial-nacional: 0 0% 0%;         /* #000000 */
  --editorial-inovacao: 101 100% 41%;    /* #42CF00 */
  --editorial-cultura: 203 98% 45%;      /* #038CE4 */
  --editorial-servicos: 47 99% 51%;      /* #FEC508 */
  
  /* Emissoras */
  --station-88fm: 203 98% 45%;           /* #038CE4 */
  --station-maravilha: 30 100% 50%;      /* #FF8000 */
  --station-gtfnews: 0 0% 0%;            /* #000000 */
  --station-fatopopular: 215 63% 20%;    /* #132D52 */
}
```

### Classes de Tema

Aplicadas automaticamente via contexto:

```css
/* Quando editorial muda, classe é aplicada ao wrapper do EditorialProvider */
.editorial-noticias { --primary: 8 81% 53%; }
.editorial-esportes { --primary: 145 93% 34%; }
.editorial-negocios { --primary: 30 100% 50%; }
.editorial-nacional { --primary: 0 0% 20%; }
.editorial-inovacao { --primary: 101 100% 41%; }
.editorial-cultura  { --primary: 203 98% 45%; }
.editorial-servicos { --primary: 47 99% 51%; }

/* Quando emissora muda, classe é aplicada ao wrapper do StationProvider */
.station-radio88fm       { --primary: 203 98% 45%; }
.station-fatopopular     { --primary: 215 63% 20%; }
.station-radio89maravilha { --primary: 30 100% 50%; }
.station-gtfnews         { --primary: 0 0% 20%; }
```

### Como o Theming Funciona (Fluxo Completo)

1. **Emissora selecionada** → `StationContext` injeta `--station-color` no DOM via `style`
2. **Editorial selecionado** → `EditorialContext` aplica classe `editorial-{type}` que sobrescreve `--primary`
3. **Componentes** usam `hsl(var(--primary))` via Tailwind ou inline `style={{ backgroundColor: corPrimaria }}`
4. **Persistência**: ao navegar de editorial → artigo, o `ArtigoPage` chama `setEditorial()` para manter o tema
5. **Reset**: ao voltar para a home de uma emissora, a classe de emissora retoma controle de `--primary`

### Tailwind Config (`tailwind.config.ts`)

Todas as cores do design system estão mapeadas:

```typescript
colors: {
  editorial: {
    noticias: "hsl(var(--editorial-noticias))",
    esportes: "hsl(var(--editorial-esportes))",
    negocios: "hsl(var(--editorial-negocios))",
    nacional: "hsl(var(--editorial-nacional))",
    inovacao: "hsl(var(--editorial-inovacao))",
    cultura:  "hsl(var(--editorial-cultura))",
    servicos: "hsl(var(--editorial-servicos))",
  },
  station: {
    "88fm":       "hsl(var(--station-88fm))",
    maravilha:    "hsl(var(--station-maravilha))",
    gtfnews:      "hsl(var(--station-gtfnews))",
    fatopopular:  "hsl(var(--station-fatopopular))",
  }
}
```

### Componentes CSS Reutilizáveis (`@layer components`)

| Classe | Descrição | Uso |
|--------|-----------|-----|
| `.editorial-bar` | Background com `hsl(var(--primary))` | EditorialBar |
| `.editorial-indicator` | Bolinha 8px colorida | Indicador em cards |
| `.editorial-badge` | Badge inline com cor do editorial | Tags de editorial |
| `.editorial-title-bar` | Título com barra lateral `::before` | Cabeçalhos de seção |
| `.news-card` | Card base com hover state | NewsCard wrapper |
| `.news-card-title` | Título que muda para `--primary` no hover | Títulos de cards |
| `.news-card-subtitle` | Subtítulo com cor muted | Subtítulos de cards |
| `.section-header` | Flex container para cabeçalho | SectionHeader |
| `.nav-category` | Item de navegação editorial | CategoryNav items |
| `.nav-category-label` | Label com transição de cor | CategoryNav labels |
| `.hero-overlay` | Gradiente sobre imagem hero | HeroSection overlay |
| `.ad-banner` | Banner publicitário estilizado | AdBanner |

---

## Guia de Reaproveitamento para AI Agents

### 1. Replicando a API

Para recriar este portal em outro sistema, implemente os seguintes endpoints REST:

```
GET /api/posts/public              → Lista de posts públicos (PostApi[])
GET /api/posts/editorial/{id}      → Posts por editorial (PostApi[])
GET /api/posts/search?query={q}    → Busca textual (PostApi[])
GET /api/tema-editorial             → Temas/cores dos editoriais (TemaEditorialApi[])
GET /api/tema-editorial/{id}        → Tema específico (TemaEditorialApi)
GET /api/emissora/{id}/buscarPorId  → Dados da emissora (EmissoraApi)
```

### 2. Mapeamento de IDs (Referência Rápida)

```json
{
  "emissoras": {
    "radio88fm": 1,
    "radio89maravilha": 4,
    "gtfnews": 4,
    "fatopopular": 5
  },
  "editoriais_fato_popular": {
    "noticias": 1,
    "esportes": 2,
    "negocios": 3,
    "nacional": 4,
    "inovacao": 5,
    "cultura": 6,
    "servicos": 7
  },
  "editoriais_radio88fm": {
    "receitas": 9,
    "musica": 10,
    "enquete": 11,
    "debates": 12
  }
}
```

### 3. Padrões de Componentização

Cada componente segue este padrão:

```typescript
// 1. Props tipadas com interface explícita
interface ComponentProps {
  data: PostApi;
  variant?: 'small' | 'large';
}

// 2. Hook para dados (React Query com cache)
const { data, isLoading, isError } = useQuery({
  queryKey: ['key'],
  queryFn: fetchFunction,
  staleTime: 1000 * 60 * 5,
});

// 3. Cores via contexto, nunca hardcoded
const { getEditorialInfo, currentEditorial } = useEditorial();
const { currentStation } = useStation();

// 4. Imagens via resolveImageUrl()
<img src={resolveImageUrl(post.imagem)} alt={post.titulo} />
```

### 4. Replicando o Theming em Outro Projeto

1. **Defina variáveis CSS HSL** no `:root` para cada entidade (emissora, editorial)
2. **Crie classes de tema** que sobrescrevem `--primary` (ex: `.editorial-esportes { --primary: 145 93% 34%; }`)
3. **Use Context API** para gerenciar qual tema está ativo
4. **Aplique classes CSS** no wrapper do provider: `<div className={getEditorialClass()}>`
5. **Componentes consomem** `hsl(var(--primary))` — nunca cores diretas em componentes
6. **Para cores inline** (quando necessário): use `style={{ backgroundColor: info.corPrimaria }}`

### 5. Padrão de Busca

```
SearchBox (inline, dropdown com 5 resultados)
    ↓ Enter
SearchPage (fullscreen, /busca?q=..., todos os resultados)
```

### 6. Navegação Multi-Nível (Fluxo de Cores)

```
Station (emissora)  →  Editorial (categoria)  →  Post (artigo)
       ↓                      ↓                       ↓
  Muda cor global       Muda cor editorial      Persiste cor editorial
  (--station-color)     (--primary override)    (setEditorial no useEffect)
```

### 7. Para Criar um Agent de IA que Gere Portais Similares

Um agent pode usar esta documentação para:

1. **Gerar o scaffolding**: Criar a estrutura de pastas e arquivos base
2. **Configurar theming**: Usar as variáveis CSS HSL como template para novas paletas
3. **Mapear APIs**: Adaptar `dotnetApi.ts` para consumir qualquer API REST com a mesma estrutura de dados
4. **Compor páginas**: Usar os componentes documentados como blocos de construção (Hero, Grid, Editorial, Cards)
5. **Adicionar emissoras**: Estender `StationContext` com novas entradas no `stationApiIds` e `fallbackStations`
6. **Adicionar editoriais**: Estender `EditorialContext` com novos arrays de `EditorialInfo`

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ ou Bun
- API .NET rodando em `http://localhost:5091`

### Instalação

```bash
# Instalar dependências
bun install

# Rodar em desenvolvimento
bun run dev
# → http://localhost:8080

# Build para produção
bun run build
# → Saída em /dist
```

---

## Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `VITE_DOTNET_URL` | `http://localhost:5091` | URL base da API .NET |

Configurar em `.env` na raiz do projeto:

```env
VITE_DOTNET_URL=https://api.gtfnews.com.br
```

---

## Dependências Principais

| Pacote | Uso |
|--------|-----|
| `react` / `react-dom` | Framework UI |
| `react-router-dom` | Roteamento SPA |
| `@tanstack/react-query` | Cache e gerenciamento de estado servidor |
| `lucide-react` | Ícones (Search, Menu, MapPin, Share2, etc.) |
| `date-fns` | Formatação de datas em pt-BR |
| `class-variance-authority` | Variantes de componentes (CVA) |
| `tailwind-merge` / `clsx` | Merge inteligente de classes CSS |
| `sonner` | Toast notifications |
| `vaul` | Drawer mobile |
| `@radix-ui/*` | Primitivos acessíveis (base do shadcn/ui) |
| `tailwindcss-animate` | Animações Tailwind (accordion, slide-in, etc.) |

---

## Licença

Propriedade da GTF Inc. Todos os direitos reservados.
