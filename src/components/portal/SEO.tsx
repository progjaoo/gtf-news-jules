import { Helmet } from 'react-helmet-async';
import { resolveImageUrl } from '@/services/dotnetApi';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  section?: string;
}

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  section
}: SEOProps) {
  const siteName = 'GTF News';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'GTF News — Portal de notícias premium com cobertura completa.';
  const metaDescription = description || defaultDescription;
  const metaImage = resolveImageUrl(image);
  const canonicalUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Standard tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Article specific */}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}

      {/* Structured Data (JSON-LD) */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": title,
            "image": [metaImage],
            "datePublished": publishedTime,
            "author": [{
              "@type": "Person",
              "name": author || siteName
            }]
          })}
        </script>
      )}
    </Helmet>
  );
}
