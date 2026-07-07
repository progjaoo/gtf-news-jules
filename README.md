# GTF News

Stack do projeto: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack React Query, Vitest
Tipo: WEB

Frontend público do portal de notícias multi-emissora do Portal 88. Consome a API `PortalGtf` e publica notícias organizadas por emissora, editorial, subcategoria, tags, destaques e mais lidas.

## Principais Funcionalidades

- Home da Rádio 88 FM.
- Home do Fato Popular.
- Rotas por emissora/editorial/notícia.
- Página de artigo com conteúdo HTML, tags, player de ouvir notícia e notícias recentes.
- Página de editorial.
- Busca.
- Destaques e mais lidas.
- Temas dinâmicos por editorial/emissora.

## API

Configure:

```env
VITE_DOTNET_URL=http://localhost:5091
```

## Rotas Principais

```text
/
/radio88fm
/fatopopular
/gtfnews
/editorial/:editorialId
/:stationSlug/editorial/:editorialId
/busca
/:stationSlug/:editorialSlug/:slug
/noticia/:id
```

## Comandos

```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
```

## Estrutura

```text
src/
├── components/portal
├── components/ui
├── contexts
├── hooks
├── pages
├── services
└── lib
```

## Documentação

- [Documentação central](../docs/README.md)
- [Guia específico do portal](../docs/gtf-news.md)
- [Mídias e uploads](../docs/media-storage.md)
- [Guia de estilo](../docs/style-guide.md)
