import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { StickyHeader } from "@/components/portal/StickyHeader";
import { Footer } from "@/components/portal/Footer";
import { NewsCard } from "@/components/portal/NewsCard";
import { usePostById, usePostBySlug, usePosts } from "@/hooks/useArticles";
import { Share2, ChevronRight, Home, ChevronDown, ChevronUp } from "lucide-react";
import { useEditorial } from "@/contexts/EditorialContext";
import { useStation } from "@/contexts/StationContext";
import { Link } from "react-router-dom";
import { registerPostView, resolveImageUrl } from "@/services/dotnetApi";
import { buildArticlePath, resolveStationSlug } from "@/lib/routes";

export default function ArtigoPage() {
  const { id, slug } = useParams();
  const postId = Number(id) || 0;
  const [showSummary, setShowSummary] = React.useState(false);
  const location = useLocation();
  const { data: noticiaBySlug, isLoading: slugLoading } = usePostBySlug(slug || "");
  const { data: noticiaById, isLoading: idLoading } = usePostById(postId);
  const noticia = slug ? noticiaBySlug : noticiaById;
  const isLoading = slug ? slugLoading : idLoading;
  const { data: allPosts } = usePosts();
  const { allEditorials, setEditorial, editorials } = useEditorial();
  const { currentStation, setStation } = useStation();

  const normalizeText = (value?: string | null) =>
    (value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const preserveEditorialSpacing = React.useCallback((html?: string | null) => {
    if (!html) return "";

    return html
      .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>|<br class="ProseMirror-trailingBreak">)*<\/p>/gi, "<p>&nbsp;</p>")
      .replace(/<p>\s*<\/p>/gi, "<p>&nbsp;</p>");
  }, []);

  const hasRegisteredView = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!noticia?.id || hasRegisteredView.current === noticia.id) return;

    hasRegisteredView.current = noticia.id;
    registerPostView(noticia.id).catch(() => {
      hasRegisteredView.current = null;
    });
  }, [noticia?.id]);

  React.useEffect(() => {
    const stationId = noticia
      ? resolveStationSlug(noticia.emissora, noticia.emissoraSlug)
      : null;

    if (stationId && (stationId === "radio88fm" || stationId === "fatopopular" || stationId === "gtfnews") && stationId !== currentStation.id) {
      setStation(stationId);
    }
  }, [noticia?.emissora, noticia?.emissoraSlug, currentStation.id, setStation]);

  React.useEffect(() => {
    if (noticia?.editorial) {
      const normalizedName = normalizeText(noticia.editorial);
      const match = allEditorials.find(e => {
        const eName = normalizeText(e.label);
        return eName === normalizedName || eName.startsWith(normalizedName) || normalizedName.startsWith(eName);
      });
      if (match) {
        setEditorial(match.id);
      }
    }
  }, [noticia?.editorial, allEditorials, currentStation.id, setEditorial]);

  // Resolve the correct editorial color by matching the editorial name
  const resolveEditorialColor = (editorial?: string, fallbackColor?: string) => {
    if (editorial) {
      const normalizedName = normalizeText(editorial);
      const match = allEditorials.find(e => {
        const eName = normalizeText(e.label);
        return eName === normalizedName || eName.startsWith(normalizedName) || normalizedName.startsWith(eName);
      });
      if (match) return match.corPrimaria;
    }
    return fallbackColor || '#E83C25';
  };

  const relatedNews = (allPosts || []).filter((n) => n.id !== noticia?.id).slice(0, 4);

  const canonicalPath = noticia ? buildArticlePath(noticia) : null;

  const articleStructure = React.useMemo(() => {
    const html = preserveEditorialSpacing(noticia?.conteudo?.trim());
    if (!html || typeof window === "undefined") {
      return {
        firstParagraphHtml: html || "",
        remainingHtml: "",
        bullets: [] as string[],
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
    const container = doc.body.firstElementChild as HTMLDivElement | null;

    if (!container) {
      return { firstParagraphHtml: html, remainingHtml: "", bullets: [] as string[] };
    }

    const paragraphs = Array.from(container.querySelectorAll("p"))
      .map((paragraph) => paragraph.textContent?.replace(/\s+/g, " ").trim() || "")
      .filter(Boolean);

    const firstParagraph = container.querySelector("p");
    const firstParagraphHtml = firstParagraph?.outerHTML || "";

    if (firstParagraph) {
      firstParagraph.remove();
    }

    const remainingHtml = container.innerHTML.trim();
    const bullets = paragraphs
      .slice(1, 5)
      .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .map((paragraph) => paragraph.length > 180 ? `${paragraph.slice(0, 177).trim()}...` : paragraph);

    return {
      firstParagraphHtml,
      remainingHtml,
      bullets,
    };
  }, [noticia?.conteudo, preserveEditorialSpacing]);

  React.useEffect(() => {
    setShowSummary(false);
  }, [noticia?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
          <div className="p-20 text-center text-2xl text-muted-foreground">Carregando...</div>
        <Footer />
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <div className="p-20 text-center text-2xl font-semibold">Notícia não encontrada.</div>
        <Footer />
      </div>
    );
  }

  if (!slug && noticia) {
    return <Navigate to={canonicalPath || `/noticia/${noticia.id}`} replace />;
  }

  if (slug && canonicalPath && location.pathname !== canonicalPath) {
    return <Navigate to={canonicalPath} replace />;
  }

  return (
    <div className="bg-background">
      <StickyHeader />

      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        {/* BREADCRUMB DINÂMICO */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home size={14} />
            <span>Home</span>
          </Link>

          <ChevronRight size={12} />

          <Link to={currentStation.homePath} className="hover:text-primary transition-colors">
            {currentStation.name}
          </Link>

          {noticia?.editorial && (
            <>
              <ChevronRight size={12} />
              <span className="hover:text-primary transition-colors cursor-default">
                {noticia.editorial}
              </span>
            </>
          )}

          {noticia?.subcategoria && (
            <>
              <ChevronRight size={12} />
              <span className="hover:text-primary transition-colors cursor-default">
                {noticia.subcategoria}
              </span>
            </>
          )}

          <ChevronRight size={12} />
          <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">
            {noticia?.titulo}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* CONTEÚDO */}
          <main className="bg-white rounded-xl shadow-sm p-8">
            {/* EDITORIA */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: resolveEditorialColor(noticia.editorial, noticia.corTema) }} />
                <span className="font-semibold uppercase text-sm" >
                  {noticia.editorial || 'NOTÍCIAS'}
                </span>
            </div>

            {/* TÍTULO */}
            <h1  className="text-3xl md:text-4xl font-bold mb-4">{noticia.titulo}</h1>

            {/* SUBTÍTULO */}
            {noticia.subtitulo && (
              <p className="text-lg text-muted-foreground mb-6">{noticia.subtitulo}</p>
            )}

            {/* META */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              {noticia.publicadoEm && (
                <span>
                  Publicado em{" "}
                  {new Date(noticia.publicadoEm).toLocaleDateString("pt-BR", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </span>
              )}
              {noticia.usuarioCriacao && <span>Por: {noticia.usuarioCriacao}</span>}
              {noticia.cidade && <span>{noticia.cidade}</span>}
            </div>

            {/* COMPARTILHAMENTO */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => {
                  const url = window.location.href;
                  const text = `${noticia.titulo} - ${url}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex items-center justify-center w-12 h-12 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                aria-label="Compartilhar no WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: noticia.titulo, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="flex items-center justify-center w-12 h-12 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                aria-label="Compartilhar"
              >
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* CONTEÚDO */}
            <div className="article-content">
              {noticia.conteudo ? (
                <>
                  {articleStructure.firstParagraphHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: articleStructure.firstParagraphHtml }} />
                  ) : null}

                  {articleStructure.bullets.length > 0 && (
                    <div className="my-8 rounded-xl border bg-muted/20 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">Resumo da matéria</p>
                          <p className="mt-1 text-sm text-muted-foreground">Pontos principais para leitura rápida.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowSummary((current) => !current)}
                          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                        >
                          {showSummary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          {showSummary ? "Ocultar resumo" : "Ver resumo"}
                        </button>
                      </div>

                      {showSummary && (
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-[1rem] leading-7 text-foreground">
                          {articleStructure.bullets.map((bullet, index) => (
                            <li key={`${index}-${bullet.slice(0, 24)}`}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {articleStructure.remainingHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: articleStructure.remainingHtml }} />
                  ) : null}
                </>
              ) : (
                <p className="text-muted-foreground">Conteúdo não disponível.</p>
              )}
            </div>

            
          </main>

          {/* SIDEBAR */}
          <aside className="hidden lg:block sticky top-28">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-bold mb-4">Veja também</h3>
              <div className="space-y-4">
                {relatedNews.map((news) => (
                  <NewsCard key={news.id} news={news} variant="horizontal" showSubtitle={false} />
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
}
