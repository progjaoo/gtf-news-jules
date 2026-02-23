# Portal de Notícias — GTF Group

Portal de notícias multi-emissora com temas dinâmicos, construído em **React + TypeScript + Tailwind CSS**.

---

## 🏗️ Arquitetura

```
src/
├── components/portal/   # Componentes visuais do portal
├── contexts/            # Context API (EditorialContext, StationContext)
├── hooks/               # Custom hooks (usePosts, useSearchPosts)
├── pages/               # Páginas (Index, ArtigoPage, NotFound)
├── services/            # Camada de serviço HTTP (dotnetApi.ts)
└── assets/              # Logos e assets estáticos
```

---

## 🔌 API .NET — Endpoints

Base URL: `http://localhost:5091` (configurável via env `VITE_DOTNET_URL`)

### 📰 Posts

| Recurso | Método | URL | Descrição |
|---------|--------|-----|-----------|
| Posts públicos | `GET` | `/api/posts/public` | Lista todos os posts publicados |
| Posts por editorial | `GET` | `/api/posts/editorial/{id}` | Posts filtrados por ID do editorial |
| Buscar posts | `GET` | `/api/posts/search?query={termo}` | Busca textual de posts |

**Modelo de retorno (PostApi):**
```json
{
  "id": 6,
  "titulo": "Título da notícia",
  "conteudo": "Conteúdo completo",
  "subtitulo": "Subtítulo",
  "slug": "slug-da-noticia",
  "imagem": "image.png",
  "publicadoEm": "2026-02-23T13:37:36",
  "editorial": "Notícias",
  "corTema": "#E83C25",
  "usuarioCriacaoId": 1,
  "usuarioCriacao": "Nome do autor",
  "emissora": "Rádio 88 FM",
  "cidade": "Rio de Janeiro"
}
```

### 🎨 Temas Editoriais

| Recurso | Método | URL |
|---------|--------|-----|
| Listar todos | `GET` | `/api/tema-editorial` |
| Buscar por ID | `GET` | `/api/tema-editorial/{id}` |

### 📻 Emissora

| Recurso | Método | URL |
|---------|--------|-----|
| Buscar por ID | `GET` | `/api/emissora/{id}/buscarPorId` |

**Mapeamento de IDs:**

| Emissora | ID API |
|----------|--------|
| Rádio 88 FM | 1 |
| 89 Maravilha | 4 |
| GTF News | 4 |

---

## 🎨 Sistema de Tema Dinâmico

### Editoriais
O `EditorialContext` carrega os temas da API `.NET` (`/api/tema-editorial`) e aplica a classe CSS `editorial-{tipo}` no root, alterando as variáveis `--primary`, `--primary-dark`, `--primary-light` e `--ring` reativamente.

| Editoria | Cor Primária |
|----------|-------------|
| Notícias | `#E83C25` |
| Esportes | `#06AA48` |
| Negócios | `#FF8000` |
| Nacional | `#000000` |
| Inovação | `#42CF00` |
| Cultura | `#038CE4` |
| Serviços | `#FEC508` |

### Emissoras
O `StationContext` busca cores via `/api/emissora/{id}/buscarPorId` e aplica `--station-color` como variável CSS global.

---

## 🔍 Busca

O `SearchBox` realiza chamadas ao endpoint `/api/posts/search?query={termo}` via React Query (mínimo 2 caracteres). Resultados são exibidos em dropdown com indicador de cor do editorial.

---

## 📦 Componentes Principais

| Componente | Descrição |
|-----------|-----------|
| `StickyHeader` | Orquestra TopHeader + EditorialBar + CategoryNav |
| `TopHeader` | Dropdown emissoras + localização (some ao scroll) |
| `EditorialBar` | Menu + Logo + SearchBox (fixo) |
| `CategoryNav` | Navegação por editorias com cores dinâmicas |
| `HeroSection` | Destaque principal + lista de notícias |
| `NewsCard` | Card de notícia (small/medium/large/horizontal) |
| `NewsGrid` | Grid responsivo de NewsCards |
| `EditorialSection` | Seção temática por editorial |
| `SearchBox` | Busca funcional com dropdown de resultados |
| `MainDrawer` | Menu lateral com navegação hierárquica |

---

## 🚀 Setup

```bash
npm install
npm run dev

# Variável de ambiente (opcional)
VITE_DOTNET_URL=http://localhost:5091
```

---

## 📦 Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Query (TanStack Query)
- React Router DOM
- Lucide React (ícones)
