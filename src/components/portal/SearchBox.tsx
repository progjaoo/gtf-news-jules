import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchPosts } from "@/hooks/useArticles";
import { useNavigate } from "react-router-dom";

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: results, isLoading } = useSearchPosts(query);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  const openArticle = (id: number) => {
    navigate(`/noticia/${id}`);
    closeSearch();
  };

  return (
    <div ref={wrapperRef} className="relative">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[hsl(var(--transparent))] text-white font-semibold hover:bg-[hsl(var(--transparent))] transition-all"
        >
          <Search size={18} className="text-white" />
          <span className="uppercase text-sm tracking-wide">Buscar</span>
        </button>
      )}

      {open && (
        <div className="relative">
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-md",
              "bg-white border border-border shadow-md",
              "animate-in slide-in-from-right-4 duration-200"
            )}
          >
            <Search size={18} className="text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar notícias..."
              className="bg-transparent outline-none w-48 text-sm text-foreground"
            />
            {isLoading && <Loader2 size={16} className="animate-spin text-muted-foreground" />}
            <button onClick={closeSearch} aria-label="Fechar busca">
              <X size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </div>

          {/* Resultados */}
          {query.length >= 2 && results && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-md shadow-lg max-h-80 overflow-y-auto z-50 min-w-[320px]">
              {results.map((post) => (
                <button
                  key={post.id}
                  onClick={() => openArticle(post.id)}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2 h-2 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: post.corTema }}
                    />
                    <span className="text-xs font-semibold uppercase" style={{ color: post.corTema }}>
                      {post.editorial}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground line-clamp-2">{post.titulo}</p>
                  {post.subtitulo && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{post.subtitulo}</p>
                  )}
                </button>
              ))}
            </div>
          )}

          {query.length >= 2 && results && results.length === 0 && !isLoading && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-md shadow-lg z-50 min-w-[320px] p-4 text-center text-sm text-muted-foreground">
              Nenhum resultado encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
