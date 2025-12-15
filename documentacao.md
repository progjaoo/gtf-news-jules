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
Controlar a emissora ativa e propagar sua identidade visual para todo o site.

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

| Editoria | ID | Cor |
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

- Controlado pelo hook `useScrollHeader`

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
--- Enquadramento dos stationProviders e EditorialProvider
