import React from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { PostApi, resolveImageUrl } from "@/services/dotnetApi";

// Keep NewsItem as alias for backward compat
export type NewsItem = PostApi;

interface NewsCardProps {
  news: PostApi;
  variant?: "small" | "medium" | "large" | "horizontal";
  showImage?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

export function NewsCard({
  news,
  variant = "medium",
  showImage = true,
  showSubtitle = true,
  className,
}: NewsCardProps) {
  const navigate = useNavigate();

  const openArticle = () => {
    navigate(`/noticia/${news.id}`);
  };

  const isSmall = variant === "small";
  const isLarge = variant === "large";
  const isHorizontal = variant === "horizontal";

  // Indicador de cor do editorial
  const editorialDot = (
    <div
      className="w-2 h-2 mt-1 rounded-sm flex-shrink-0"
      style={{ backgroundColor: news.corTema }}
    />
  );

  if (isHorizontal) {
    return (
      <article
        onClick={openArticle}
        className={cn("news-card flex gap-4 cursor-pointer p-3", className)}
      >
      {showImage && (
          <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded">
            <img
              src={resolveImageUrl(news.imagem)}
              alt={news.titulo}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-start gap-2 mb-2">
            {editorialDot}
            <h3 className="news-card-title text-base line-clamp-3">
              {news.titulo}
            </h3>
          </div>

          {showSubtitle && news.subtitulo && (
            <p className="news-card-subtitle text-xs mt-2 line-clamp-2">
              {news.subtitulo}
            </p>
          )}
        </div>
      </article>
    );
  }

  return (
    <article onClick={openArticle} className={cn("news-card cursor-pointer p-3", className)}>
      {showImage && (
        <div
          className={cn(
            "overflow-hidden rounded",
            isLarge ? "aspect-[16/10]" : "aspect-video"
          )}
        >
          <img
            src={resolveImageUrl(news.imagem)}
            alt={news.titulo}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className={cn("pt-3", isLarge && "pt-4")}>
        <div className="flex items-start gap-2 mb-2">
          {editorialDot}
          <h3
            className={cn(
              "news-card-title",
              isSmall && "text-sm line-clamp-2",
              !isSmall && !isLarge && "text-base line-clamp-3",
              isLarge && "text-xl line-clamp-3"
            )}
          >
            {news.titulo}
          </h3>
        </div>

        {showSubtitle && news.subtitulo && (
          <p
            className={cn(
              "news-card-subtitle mt-2 ml-3",
              isSmall && "text-xs line-clamp-2",
              !isSmall && "line-clamp-2"
            )}
          >
            {news.subtitulo}
          </p>
        )}
      </div>
    </article>
  );
}
