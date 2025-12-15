import { useParams } from "react-router-dom";
import { mockNews } from "@/data/mockNews";
import { StickyHeader } from "@/components/portal/StickyHeader";
import { Footer } from "@/components/portal/Footer";
import { NewsCard } from "@/components/portal/NewsCard";

const editorialColors: Record<string, string> = {
  noticias: "bg-editorial-noticias",
  nacional: "bg-editorial-nacional",
  esportes: "bg-editorial-esportes",
  negocios: "bg-editorial-negocios",
  inovacao: "bg-editorial-inovacao",
  cultura: "bg-editorial-cultura",
  servicos: "bg-editorial-servicos",
};

export default function ArtigoPage() {
  const { id } = useParams();
  const noticia = mockNews.find((n) => n.id === Number(id));

  if (!noticia) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <div className="p-20 text-center text-2xl font-semibold">
          Notícia não encontrada.
        </div>
        <Footer />
      </div>
    );
  }

  return (
  <div className="bg-background">
    <StickyHeader />

    <div className="max-w-[1200px] mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

        {/* CONTEÚDO DO ARTIGO */}
        <main className="bg-white rounded-xl shadow-sm p-8">

          {/* EDITORIA */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`w-3 h-3 rounded-sm ${editorialColors[noticia.editoria]}`}
            />
            <span className="text-primary font-semibold uppercase text-sm">
              {noticia.editoria}
            </span>
          </div>

          {/* TÍTULO */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {noticia.titulo}
          </h1>

          {/* SUBTÍTULO */}
          {noticia.subtitulo && (
            <p className="text-lg text-muted-foreground mb-6">
              {noticia.subtitulo}
            </p>
          )}

          {/* DATA */}
          <div className="text-sm text-muted-foreground mb-6">
            Publicado em{" "}
            {new Date(noticia.dataPublicacao).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          {/* IMAGEM */}
          <div className="rounded-lg overflow-hidden mb-8">
            <img
              src={noticia.imagem}
              alt={noticia.titulo}
              className="w-full"
            />
          </div>

          {/* TEXTO */}
          <div className="prose prose-lg max-w-none">
            <p>
              Este é um texto de demonstração da matéria. Em breve isso será
              substituído pelo conteúdo real retornado da API com corpo completo
              da notícia.
              <br/>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, libero, delectus asperiores nemo, 
              dolorem fugiat reiciendis ad facere natus velit nisi eaque quo. Voluptatum atque vel quo ipsam non culpa.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dolorem, odit illum odio quas voluptatibus libero id, quia, mollitia ipsam iure sed! Recusandae voluptates,
              dolore iusto tenetur aspernatur ratione quisquam!

              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio quibusdam quidem iste officia, non voluptatem eligendi modi!
              Unde expedita, atque doloremque magnam, dolore quos dolorum tenetur nihil aut exercitationem mollitia.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi omnis laborum eius quis architecto quod nam tempore consequatur autem inventore. 
              Consequatur deleniti consequuntur quo beatae amet natus dolore animi soluta.
            </p>
            <br/>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nulla minus eos eveniet commodi. Soluta fuga alias aliquam quae deleniti,
               pariatur numquam illo quasi nisi dignissimos nobis ipsa doloremque eveniet?
            </p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ea nisi officiis est itaque. Atque consectetur nihil officia exercitationem fugiat eligendi
               incidunt veniam. Odio dicta suscipit exercitationem obcaecati officiis. Aspernatur!</p>
          </div>

          {/* COMENTÁRIOS */}
          <div className="mt-16 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Comentários</h2>
            <p className="text-muted-foreground mb-4">
              Para comentar, faça login na plataforma.
            </p>
            <button className="px-6 py-3 bg-foreground text-background rounded-md font-semibold">
              Entrar
            </button>
          </div>
        </main>

        {/* SIDEBAR — NOTÍCIAS RELACIONADAS */}
        <aside className="hidden lg:block sticky top-28">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-bold mb-4">
              Veja também
            </h3>

            <div className="space-y-4">
              {mockNews
                .filter((n) => n.id !== noticia.id)
                .slice(0, 4)
                .map((news) => (
                  <NewsCard
                    key={news.id}
                    news={news}
                    variant="horizontal"
                    showSubtitle={false}
                  />
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