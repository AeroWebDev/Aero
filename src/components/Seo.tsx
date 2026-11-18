type SeoProps = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: string;
  locale?: string;
  siteName?: string;
  twitterCard?: string;
  jsonLd?: unknown;
};

export default function Seo({
  title,
  description,
  canonical,
  image = "https://aeroteam.vercel.app/og-image.png",
  type = "website",
  locale = "en_US",
  siteName = "Aero Team",
  twitterCard = "summary_large_image",
  jsonLd,
}: SeoProps) {
  const fullTitle = title.includes("Aero") ? title : `${title} | ${siteName}`;
  const resolvedImage = image.startsWith("http") ? image : `https://aeroteam.vercel.app${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </>
  );
}
