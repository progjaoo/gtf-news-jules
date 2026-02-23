import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostApi } from '@/services/dotnetApi';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostHorizontalCardProps {
  post: PostApi;
}

export function PostHorizontalCard({ post }: PostHorizontalCardProps) {
  const navigate = useNavigate();

  const formattedDate = post.publicadoEm
    ? format(new Date(post.publicadoEm), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : 'Data não disponível';

  return (
    <article
      className="flex flex-col sm:flex-row bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer"
      onClick={() => navigate(`/noticia/${post.id}`)}
    >
      {/* Imagem */}
      <div className="sm:w-72 w-full h-48 sm:h-auto sm:min-h-[200px] flex-shrink-0 overflow-hidden">
        <img
          src={post.imagem || '/placeholder.svg'}
          alt={post.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between flex-1 p-5 gap-3">
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {formattedDate}
          </span>
          <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.titulo}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.subtitulo || post.conteudo}
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            variant="default"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/noticia/${post.id}`);
            }}
          >
            Ler Mais
          </Button>
        </div>
      </div>
    </article>
  );
}
