import { StickyHeader } from "@/components/portal/StickyHeader";
import { CategoryNav } from "@/components/portal/CategoryNav";
import { Footer } from "@/components/portal/Footer";
import { NewsGrid } from "@/components/portal/NewsGrid";
import { mockNews } from "@/data/mockNews";
import { useParams } from "react-router-dom";

const editorialColors: Record<string, string> = {
  noticias: "bg-editorial-noticias",
  nacional: "bg-editorial-nacional",
  esportes: "bg-editorial-esportes",
  negocios: "bg-editorial-negocios",
  inovacao: "bg-editorial-inovacao",
  cultura: "bg-editorial-cultura",
  servicos: "bg-editorial-servicos",
};

export default function Artigo() {

  const { id } = useParams();

  // 👉 Converte o ID da URL para número e busca no mock
  const noticia = mockNews.find((n) => n.id === Number(id));

  // 👉 Se não existir notícia com esse ID
  if (!noticia) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <CategoryNav />
        <div className="p-20 text-center text-2xl font-semibold">
          Notícia não encontrada.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <CategoryNav />

      {/* IMAGEM PRINCIPAL */}
      <div className="w-full max-w-5xl mx-auto mt-4 px-4">
        <div className="rounded-xl overflow-hidden shadow-sm">
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="w-full h-[380px] md:h-[480px] object-cover"
          />
        </div>
      </div>

      {/* CONTEÚDO */}
      <article className="w-full max-w-3xl mx-auto px-4 mt-6">

        {/* EDITORIAL */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`w-3 h-3 rounded-sm ${
              editorialColors[noticia.editoria]
            }`}
          />
          <span className="text-primary font-semibold uppercase text-sm">
            {noticia.editoria.toUpperCase()}
          </span>
        </div>

        {/* TÍTULO */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4">
          {noticia.titulo}
        </h1>

        {/* TEXTO FAKE */}
        <div className="article-body text-lg leading-relaxed text-foreground">
          <p>
            Cidades da Região Metropolitana de Belo Horizonte entraram em alerta
            amarelo de chuvas intensas nesta segunda-feira. As autoridades
            recomendam cautela ao transitar por regiões de encosta e evitar áreas
            alagadas.
          </p>

          <p>
            O aviso aponta para perigo potencial, com risco de quedas de árvores,
            interrupções no fornecimento de energia elétrica e dificuldade de
            mobilidade urbana em alguns trechos.
          </p>

          <p>
            Segundo o Inmet, o volume de chuva poderá permanecer elevado até a
            manhã de terça-feira, impactando diversas áreas da região sudeste.
          </p>
        </div>

        {/* COMENTÁRIOS */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-2">Comentários (335)</h2>
          <p className="text-muted-foreground mb-4">
            Acesse sua conta da Torre e participe da conversa
          </p>
          <button className="px-6 py-2 bg-foreground text-background rounded-md font-semibold">
            Acessar
          </button>
        </div>
      </article>

      {/* VEJA TAMBÉM */}
      <section className="w-full max-w-3xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold mb-6">Veja também</h2>
        <NewsGrid news={mockNews.slice(1, 4)} columns={1} />
      </section>

      <Footer />
    </div>
  );
}
