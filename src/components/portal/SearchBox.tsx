import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Foca no input ao abrir
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Fecha ao clicar fora
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

  // Fecha ao rolar a página
  useEffect(() => {
    function handleScroll() {
      if (open) {
        setOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* BOTÃO FECHADO – estilo G1 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            flex items-center gap-2 px-4 py-2 rounded-md 
            bg-[hsl(var(--primary-dark))] text-white font-semibold
            hover:bg-[hsl(var(--primary))] transition-all
          "
        >
          <Search size={18} className="text-white" />
          <span className="uppercase text-sm tracking-wide">Buscar</span>
        </button>
      )}

      {/* BOX ABERTO */}
      {open && (
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

          <button
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
            aria-label="Fechar busca"
          >
            <X size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
}
