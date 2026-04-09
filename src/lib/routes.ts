import { PostApi } from "@/services/dotnetApi";

function normalizeText(value?: string | null) {
  return (value || "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function slugifySegment(value?: string | null) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function resolveStationSlug(emissora?: string | null, emissoraSlug?: string | null) {
  const normalizedSlug = slugifySegment(emissoraSlug);
  if (normalizedSlug) {
    if (["radio88fm", "radio-88-fm", "radio-88", "88-fm", "88fm"].includes(normalizedSlug)) {
      return "radio88fm";
    }
    if (["fatopopular", "fato-popular", "fato-popular-88-fm"].includes(normalizedSlug)) {
      return "fatopopular";
    }
    if (["gtfnews", "gtf-news"].includes(normalizedSlug)) {
      return "gtfnews";
    }
    return normalizedSlug;
  }

  const normalized = normalizeText(emissora);
  if (normalized.includes("88")) return "radio88fm";
  if (normalized.includes("fato popular")) return "fatopopular";
  if (normalized.includes("gtf")) return "gtfnews";

  return "gtfnews";
}

export function buildArticlePath(post: Pick<PostApi, "id" | "slug" | "editorial" | "emissora" | "emissoraSlug">) {
  const articleSlug = slugifySegment(post.slug);
  if (!articleSlug) {
    return `/noticia/${post.id}`;
  }

  const stationSlug = resolveStationSlug(post.emissora, post.emissoraSlug);
  const editorialSlug = slugifySegment(post.editorial) || "noticias";

  return `/${stationSlug}/${editorialSlug}/${articleSlug}`;
}
