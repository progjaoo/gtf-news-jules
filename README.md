# Documentação Completa — Portal GTF News

Este documento consolida **todas as decisões, ajustes, correções e padrões técnicos** implementados até o momento no Portal GTF News. Ele serve como referência única para manutenção, evolução e onboarding de novos desenvolvedores.

---

## 1. Visão Geral do Projeto

O Portal GTF News é uma aplicação web construída com **React + Vite**, inspirada no comportamento do G1, porém mantendo identidade visual própria e preparada para futura integração com APIs.

### Stack principal

- React
- Vite
- TypeScript
- React Router DOM
- Context API
- Tailwind CSS
- Lucide Icons
- Shadcn UI (Dropdown, Tooltip, etc.)

---

## 2. Arquitetura de Estado Global

Foram criados **dois contextos globais independentes**, responsáveis por controlar identidade visual e navegação.

### 2.1 StationContext (Emissoras)

#### Objetivo
- Controlar a emissora ativa e propagar sua identidade visual para todo o site.

#### Emissoras configuradas

| Emissora | ID | Cor |
|--------|----|-----|
| Radio 88 FM | radio88fm | #038CE4 |
| Radio 89 Maravilha | radio89maravilha | #FF8000 |
| GTF News | gtfnews | #000000 |

#### Responsabilidades

- Armazenar emissora atual
- Expor função `setStation`
- Disponibilizar cor da emissora (`currentStation.color`)
- Permitir troca via dropdown no TopHeader
- Envolver toda a aplicação com `StationProvider`

#### Componentes afetados

- TopHeader (texto BRASIL)
- EditorialBar (background)
- AdBanner (background)
- StationSelector
- Logos dinâmicos no header

---

### 2.2 EditorialContext (Editorias)

#### Objetivo
Controlar editoria ativa e suas cores, mantendo estrutura preparada para futura API.

#### Editorias configuradas

| Editorial | ID       | Cor |
|----------|----------|-----------|
| Notícias | noticias | #E83C25 |
| Esportes | esportes | #06AA48 |
| Negócios | negocios | #FF8000 |
| Nacional | nacional | #000000 |
| Inovação | inovacao | #42CF00 |
| Cultura  | cultura  | #038CE4 |
| Serviços | servicos | #FEC508 |

#### Responsabilidades

- Controlar editoria atual
- Expor label, cor e metadados
- Alimentar CategoryNav, SectionHeader e NewsCard
- Estrutura pronta para futura API

---

## 3. Estrutura de Header (Comportamento tipo G1)

### Componentes envolvidos

- TopHeader
- EditorialBar (Barra onde ficam o Menu - Logo - Busca)
- CategoryNav (Barra de categorias do site)
- StickyHeader (orquestrador dos 3 headers separados)

---

### 3.1 TopHeader

#### Função

- Exibe:
  - Dropdown de emissoras
  - Texto "BRASIL" (mas será dinamico com troca de localizacao do Usuário)
  - Localização
- Texto "BRASIL" muda de cor conforme emissora
- **Some ao iniciar o scroll**

#### Controle de visibilidade

- Controlado pelo hook que criei -> `useScrollHeader`

---

### 3.2 EditorialBar

#### Função

- Barra principal do portal
- Exibe:
  - Menu
  - Logo da emissora
  - SearchBox
- **Sempre fixa após início do scroll**
- Cor muda conforme emissora selecionada e conforme a escolha dos temas de editorial selecionado

#### Implementação da cor

```tsx
style={{ backgroundColor: currentStation.color }}
```

#### 3.3 CategoryNav
#### Função

--- Navegação por editorias
--- Cada item usa a cor da editoria
--- Destaque visual conforme editoria ativa
--- Sempre fixa após início do scroll

#### 4. StickyHeader (Componente crítico)
--- Função
--- Unificar e controlar o comportamento de scroll dos headers.

#### 5. App.tsx - App.css - index.css - 

--- APP.TSX = Organizacao das rotas
--- Enquadramento dos StationProviders e EditorialProvider
__________________________________________________________________________________________________________________________________________

# Portal GTF News - Documentação Técnica

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Contextos Globais](#contextos-globais)
4. [Estrutura de Componentes](#estrutura-de-componentes)
5. [Sistema de Temas](#sistema-de-temas)
6. [Preparação para API](#preparação-para-api)

---

## Visão Geral

Portal de notícias multi-emissora com sistema de editorias, inspirado no G1. Stack: **React + Vite + TypeScript + Tailwind CSS**.

### Características Principais
- ✅ Troca dinâmica de emissoras (Radio 88 FM, Radio 89 Maravilha, GTF News)
- ✅ Sistema de editorias com cores específicas
- ✅ Header sticky com comportamento tipo G1
- ✅ Estrutura preparada para integração com API
- ✅ Responsivo e com componentes reutilizáveis

---

## Arquitetura

### Estrutura de Pastas
```
src/
├── components/
│   ├── portal/          # Componentes do portal
│   └── ui/              # Componentes base (shadcn)
├── contexts/            # Contextos globais
├── data/                # Dados mock (temporário)
├── hooks/               # Custom hooks
├── pages/               # Páginas/rotas
└── lib/                 # Utilitários
```

---

## 🔄 Contextos Globais

### 1. StationContext (`src/contexts/StationContext.tsx`)

**Responsabilidade**: Controlar emissora ativa e identidade visual global.

#### Emissoras Configuradas
```typescript
{
  id: "radio88fm" | "radio89maravilha" | "gtfnews",
  name: string,
  color: string  // HEXADECIMAL
}
```

| Emissora | ID    | Cor |
|----------|-------|---------|
| Radio 88 FM | `radio88fm` | `#038CE4` |
| Radio 89 Maravilha | `radio89maravilha` | `#FF8000` |
| GTF News | `gtfnews` | `#000000` |

#### Uso
```tsx
const { currentStation, setStation } = useStation();
// currentStation.color → cor atual
// setStation('radio88fm') → troca emissora
```

#### Componentes Afetados
- `TopHeader` - texto "BRASIL"
- `EditorialBar` - background
- `AdBanner` - background
- `StationSelector` - dropdown

---

### 2. EditorialContext (`src/contexts/EditorialContext.tsx`)

**Responsabilidade**: Controlar editoria ativa e suas cores.

#### Editorias Configuradas
```typescript
{
  id: EditorialType,
  label: string,
  color: string,  // classe Tailwind
  subtopico?: string
}
```

| Editoria | ID | Cor |
|----------|----------|-----------|
| Notícias | `noticias` | `#E83C25` |
| Esportes | `esportes` | `#06AA48` |
| Negócios | `negocios` | `#FF8000` |
| Nacional | `nacional` | `#000000` |
| Inovação | `inovacao` | `#42CF00` |
| Cultura  | `cultura`  | `#038CE4` |
| Serviços | `servicos` | `#FEC508` |

#### Uso das Cores
```tsx
const { currentEditorial, setEditorial, getEditorialInfo } = useEditorial();
```

---

## Estrutura de Componentes

### Header (Comportamento tipo G1)

```
┌─────────────────────────────────┐
│ TopHeader (some ao scroll)      │ ← Dropdown emissoras + localização
├─────────────────────────────────┤
│ EditorialBar (sempre fixo)      │ ← Menu + Logo + Busca
├─────────────────────────────────┤
│ CategoryNav (sempre fixo)       │ ← Editorias
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ AdBanner                        │ ← Banner de Anuncio sera trocado dinamicamente
├─────────────────────────────────┤
│ EditorialSection                │ ← Secao de editoriais 
├─────────────────────────────────┤
│ HeroSection                     │ ← Secao de hero onde esta localizado cards verticais + noticias primária
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ MainDrawer                      │ ← Componente de Menu contendo opcoes diversas
├─────────────────────────────────┤
│ NewsCard                        │ ← Componentes de Cards de Noticias, tanto horizontal quanto vertical
├─────────────────────────────────┤
│ NewsGrid                        │ ← Grid de Notícias separacao das colunas e linhas do Grid do Cards
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ SearchBox                       │ ← Componente de Pesquisa de Noticias personalizado
├─────────────────────────────────┤
│ SectionHeader                   │ ← Secoes do Header onde estao manipulando as cores
├─────────────────────────────────┤
│ StickyHeader                    │ ← Componente de Juncao + separacao do TopHeader + EditorialBar/CategoryNav => fixos
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ Footer                          │ ← Footer personalizado 
├─────────────────────────────────┤
│ VerMaisButton                   │ ← Botao ver mais personalizado
├─────────────────────────────────┤
│ StationSelector                 │ ← Selecao de emissoras, estacao. Que ajusta as trocas de cores.
└─────────────────────────────────┘
```

#### Componentes do Header

**1. TopHeader** - Barra superior
- Dropdown de emissoras
- Texto "BRASIL" (cor dinâmica por emissora)
- Localização do usuário

**2. EditorialBar** - Barra principal
- Menu lateral (MainDrawer)
- Logo dinâmico por emissora
- SearchBox expansível

**3. CategoryNav** - Navegação de editorias
- Bolinhas coloridas por editorial
- Destaque visual da editorial ativo

---

### Componentes de Notícias

#### NewsCard (`src/components/portal/NewsCard.tsx`)
```typescript
interface NewsItem {
  id: number;
  titulo: string;
  subtitulo?: string;
  imagem: string;
  editoria: EditorialType;
  dataPublicacao: string;
}

// Variantes: small | medium | large | horizontal
```

#### NewsGrid
Layout responsivo de notícias (1-4 colunas).

#### HeroSection
Seção de destaque com notícia principal + lista lateral.

---

### Menu Lateral (MainDrawer)

**Estrutura Hierárquica (sera reavaliado)**:
```
Início
Editorias
  ├─ Nacional
  │   ├─ Política
  │   ├─ Economia
  │   └─ ...
  ├─ Esportes
  │   ├─ Futebol
  │   └─ ...
  └─ ...
Últimas Notícias
Configurações
```

**Componente recursivo** para subníveis automáticos.

---

## 🎨 Sistema de Temas

### CSS Variables (`src/index.css`)

#### Cores por Editoria
```css
--editorial-noticias: 8 81% 53%;    /* #E83C25 */
--editorial-esportes: 145 93% 34%;  /* #06AA48 */
--editorial-negocios: 30 100% 50%;  /* #FF8000 */
/* ... */
```

#### Cores por Station
```css
--station-88fm: 203 98% 45%;        /* #038CE4 */
--station-maravilha: 30 100% 50%;   /* #FF8000 */
--station-gtfnews: 0 0% 0%;         /* #000000 */
```

### Classes Dinâmicas
```tsx
// Aplicadas automaticamente
.editorial-noticias { --primary: ...; }
.station-radio88fm { --station-primary: ...; }
```

---

## 🔌 Preparação para API

### Estrutura de Dados Mock (`src/data/mockNews.ts`)

```typescript
// Atualmente usando dados estáticos
export const mockNews: NewsItem[] = [...]

// Filtros por editoria
export const mockNegociosNews = mockNews.filter(...)
export const mockNacionalNews = mockNews.filter(...)
```

### Endpoints Necessários

#### 1. **Emissoras**
```
GET /api/stations
Response: [{ id, name, color, logo }]
```

#### 2. **Editorias**
```
GET /api/editorials
Response: [{ id, label, color, subtopics }]
```

#### 3. **Notícias**
```
GET /api/news?editorial={id}&limit={n}
GET /api/news/{id}
Response: NewsItem
```

#### 4. **Menu**
```
GET /api/menu
Response: MenuItem[] (estrutura hierárquica)
```

### Pontos de Integração

**1. StationContext**
```tsx
// Substituir array estático por:
const { data: stations } = useQuery('/api/stations');
```
**2. EditorialContext**
```tsx
const { data: editorials } = useQuery('/api/editorials');
```
**3. Componentes de Notícias**
```tsx
const { data: news } = useQuery(`/api/news?editorial=${editorial}`);
```

---

## Páginas

### Index (`src/pages/Index.tsx`)
- HeroSection
- Grade de notícias
- Seções por editoria
- Banners de anúncio

### ArtigoPage (`src/pages/ArtigoPage.tsx`)
- Detalhes da notícia
- Sidebar com notícias relacionadas
- Seção de comentários (placeholder)

### Roteamento
```tsx
<Route path="/" element={<Index />} />
<Route path="/noticia/:id" element={<ArtigoPage />} />
<Route path="*" element={<NotFound />} />
```

---

## Próximos Passos para API

### 1. Backend Setup
- [ ] Criar endpoints REST
- [ ] Estrutura de BD (PostgreSQL/MongoDB)
- [ ] Autenticação (se necessário)

### 2. Frontend Integration
- [ ] Instalar React Query / SWR
- [ ] Criar serviço de API (`src/services/api.ts`)
- [ ] Migrar contextos para usar dados da API
- [ ] Adicionar loading states
- [ ] Tratamento de erros

---

## Dependências Principais

- `react-router-dom` - Roteamento
- `@tanstack/react-query` - State management (futuro)
- `lucide-react` - Ícones
- `@radix-ui/*` - Componentes acessíveis
- `tailwindcss` - Estilização
- `clsx` + `tailwind-merge` - Utilitários CSS

---

## implementacao de tela ADMIN e REDATORES PARA PUBLICAR NOTICIAS
```
src/admin/config/permissions.ts
export const permissions = {
  [UserRole.ADMIN]: [
    'noticias.create',
    'noticias.edit.all',
    'noticias.delete',
    'noticias.publish',
    'usuarios.manage',
    'editorias.manage',
    'configuracoes.manage'
  ],
  
  [UserRole.EDITOR]: [
    'noticias.create',
    'noticias.edit.own',
    'noticias.edit.editorial', // Só da sua editoria
    'noticias.publish',
    'noticias.review'
  ],
  
  [UserRole.REVISOR]: [
    'noticias.view',
    'noticias.review',
    'noticias.suggest'
  ],
  
  [UserRole.REDATOR]: [
    'noticias.create',
    'noticias.edit.own',
    'noticias.submit_review'
  ]
};

export function hasPermission(user: User, permission: string): boolean {
  return permissions[user.role]?.includes(permission) || false;
}
```
--- 

### Fluxo de Aprovação
```
┌─────────────┐
│  Redator    │ Cria → RASCUNHO
└──────┬──────┘
       │ Envia para Revisão
       ↓
┌─────────────┐
│  Revisor    │ Revisa → REVISAO
└──────┬──────┘
       │ Aprova/Rejeita
       ↓
┌─────────────┐
│  Editor     │ Publica → PUBLICADO
└─────────────┘
```

---

## Estrutura de Pastas Completa
```
src/
├── portal/                    # Portal Público
│   ├── pages/
│   ├── components/
│   └── contexts/
│
├── admin/                     # Área Admin
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── noticias/
│   │   │   ├── ListaNoticias.tsx
│   │   │   ├── NovaNoticia.tsx
│   │   │   └── EditarNoticia.tsx
│   │   ├── usuarios/
│   │   │   ├── ListaUsuarios.tsx
│   │   │   └── FormUsuario.tsx
│   │   └── configuracoes/
│   │
│   ├── components/
│   │   ├── RichTextEditor.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── TagInput.tsx
│   │   └── NoticiaTable.tsx
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx
│   │
│   ├── layouts/
│   │   └── AdminLayout.tsx
│   │
│   ├── types/
│   │   ├── user.ts
│   │   └── noticia.ts
│   │
│   ├── config/
│   │   └── permissions.ts
│   │
│   └── utils/
│       └── api.ts
│
└── shared/                    # Compartilhado
    ├── components/ui/
    └── lib/
```

---

## API Endpoints

### Autenticação
```
POST   /api/admin/login
POST   /api/admin/logout
POST   /api/admin/refresh-token
POST   /api/admin/recuperar-senha
POST   /api/admin/resetar-senha
GET    /api/admin/me

```

### Notícias

GET    /api/admin/noticias                    # Lista com filtros
GET    /api/admin/noticias/:id                # Detalhes
POST   /api/admin/noticias                    # Criar
PUT    /api/admin/noticias/:id                # Editar
DELETE /api/admin/noticias/:id                # Deletar
PATCH  /api/admin/noticias/:id/status         # Alterar status
PATCH  /api/admin/noticias/:id/destaque       # Toggle destaque
POST   /api/admin/noticias/:id/revisar        # Enviar revisão


### Usuários
```
GET    /api/admin/usuarios
GET    /api/admin/usuarios/:id
POST   /api/admin/usuarios
PUT    /api/admin/usuarios/:id
DELETE /api/admin/usuarios/:id
PATCH  /api/admin/usuarios/:id/status
```

### Upload
```
POST   /api/admin/upload/imagem
POST   /api/admin/upload/documento
```

### Dashboard
```
GET    /api/admin/stats                       # Estatísticas gerais
GET    /api/admin/noticias/recentes           # Últimas notícias
GET    /api/admin/noticias/pendentes          # Aguardando revisão
```

### Fase 1 - Auth & Base

- Sistema de autenticação JWT
- Protected routes
- Layout admin base
- Dashboard simples

### Fase 2 - CRUD Notícias

- Listagem com filtros
- Formulário criar/editar
- Editor rico (TipTap)
- Upload de imagens

### Fase 3 - Workflow

- Sistema de status
- Fluxo de aprovação
- Notificações
- Histórico de alterações

### Fase 4 - Gestão

- Gerenciamento de usuários
- Permissões granulares
- Logs de atividades
- Relatórios

**Documentação criada em**: 15/12/2024
**Versão**: 1.0
