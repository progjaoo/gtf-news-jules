import { useSearchParams, useNavigate } from 'react-router-dom';
import { StickyHeader } from '@/components/portal/StickyHeader';
import { Footer } from '@/components/portal/Footer';
import { useSearchPosts } from '@/hooks/useArticles';
import { useStation } from '@/contexts/StationContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { useState } from 'react';

function SearchResultCard({ post, stationColor }: { post: any; stationColor: string }) {
  const navigate = useNavigate();
  const date = post.publicadoEm
    ? new Date(post.publicadoEm).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
      })
    : '';

  return (
    <article
      className="flex gap-5 py-5 border-b border-border cursor-pointer group"
      onClick={() => navigate(`/noticia/${post.id}`)}
    >
      {/* Imagem */}
      <div className="flex-shrink-0 w-[220px] h-[140px] rounded-lg overflow-hidden bg-muted">
        <img
          src={post.imagem || '/placeholder.svg'}
          alt={post.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <span
          className="text-xs font-bold uppercase tracking-wide mb-1"
          style={{ color: post.corTema || stationColor }}
        >
          {post.editorial}
        </span>
        <h3
          className="text-lg font-bold leading-snug line-clamp-2 mb-1 group-hover:underline"
          style={{ color: stationColor }}
        >
          {post.titulo}
        </h3>
        {post.subtitulo && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.subtitulo}</p>
        )}
        {date && (
          <span className="text-xs text-muted-foreground">{date}</span>
        )}
      </div>
    </article>
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(q);
  const { data: results, isLoading } = useSearchPosts(q);
  const { currentStation } = useStation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length >= 2) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* Barra de busca no topo */}
      <div className="w-full" style={{ backgroundColor: currentStation.color }}>
        <div className="container py-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Search size={20} className="text-primary-foreground flex-shrink-0" />
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Buscar notícias..."
              className="flex-1 bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 rounded-md px-4 py-2 text-sm outline-none border border-primary-foreground/30 focus:border-primary-foreground/60 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-foreground/20 text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary-foreground/30 transition-colors border border-primary-foreground/30"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Filtros */}
      <div className="border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>EXIBINDO</span>
            <span className="font-bold" style={{ color: currentStation.color }}>
              TODOS OS RESULTADOS
            </span>
            <span>MAIS</span>
            <span className="font-bold" style={{ color: currentStation.color }}>
              RECENTES
            </span>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="container py-6 max-w-4xl">
        {q && (
          <p className="text-sm text-muted-foreground mb-6">
            Resultados para: <strong className="text-foreground">"{q}"</strong>
          </p>
        )}

        {isLoading && (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-5">
                <Skeleton className="w-[220px] h-[140px] rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && results && results.length > 0 && (
          <div>
            {results.map((post) => (
              <SearchResultCard key={post.id} post={post} stationColor={currentStation.color} />
            ))}
          </div>
        )}

        {!isLoading && results && results.length === 0 && q && (
          <div className="text-center py-16 text-muted-foreground">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">Nenhum resultado encontrado</p>
            <p className="text-sm mt-1">Tente buscar por outros termos.</p>
          </div>
        )}

        {!q && (
          <div className="text-center py-16 text-muted-foreground">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">Digite um termo para buscar notícias.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
