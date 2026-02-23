import { useParams } from "react-router-dom";
import { StickyHeader } from "@/components/portal/StickyHeader";
import { Footer } from "@/components/portal/Footer";
import { NewsCard } from "@/components/portal/NewsCard";
import { usePostById, usePosts } from "@/hooks/useArticles";

export default function ArtigoPage() {
  const { id } = useParams();
  const postId = Number(id) || 0;
  const { data: noticia, isLoading } = usePostById(postId);
  const { data: allPosts } = usePosts();

  const relatedNews = (allPosts || []).filter((n) => n.id !== postId).slice(0, 4);

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

  return (
    <div className="bg-background">
      <StickyHeader />

      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* CONTEÚDO */}
          <main className="bg-white rounded-xl shadow-sm p-8">
            {/* EDITORIA */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: noticia.corTema }} />
              <span className="font-semibold uppercase text-sm" style={{ color: noticia.corTema }}>
                {noticia.editorial}
              </span>
            </div>

            {/* TÍTULO */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{noticia.titulo}</h1>

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
              {noticia.usuarioCriacao && <span>Por {noticia.usuarioCriacao}</span>}
              {noticia.cidade && <span>{noticia.cidade}</span>}
            </div>

            {/* IMAGEM */}
            {noticia.imagem && (
              <div className="rounded-lg overflow-hidden mb-8">
                <img src={noticia.imagem} alt={noticia.titulo} className="w-full" />
              </div>
            )}

            {/* CONTEÚDO */}
            <div className="prose prose-lg max-w-none">
              {noticia.conteudo ? (
                <div dangerouslySetInnerHTML={{ __html: noticia.conteudo.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-muted-foreground">Conteúdo não disponível.</p>
              )}
            </div>

            {/* COMENTÁRIOS */}
            <div className="mt-16 border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">Comentários</h2>
              <p className="text-muted-foreground mb-4">Para comentar, faça login na plataforma.</p>
              <button className="px-6 py-3 bg-foreground text-background rounded-md font-semibold">Entrar</button>
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
