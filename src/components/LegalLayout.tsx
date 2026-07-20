import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Seo from "@/components/Seo";

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  canonicalPath: string;
  children: React.ReactNode;
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

export default function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  canonicalPath,
  children,
}: LegalLayoutProps) {
  const { t } = useTranslation();
  const canonicalUrl = `https://aeroteam.vercel.app${canonicalPath}`;
  const appName = t("common.appName");
  const legalSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: appName,
      url: "https://aeroteam.vercel.app",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${title} | ${appName}`,
      url: canonicalUrl,
      description: subtitle,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${title} | ${appName}`}
        description={subtitle}
        canonical={canonicalUrl}
        jsonLd={legalSchema}
      />
      <Navbar />

      {/* Hero header */}
      <div className="pt-32 pb-14 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(217 91% 60% / 0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-3">
            {subtitle}
          </p>
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-24 max-w-3xl">
        <div
          className="glass rounded-2xl p-8 sm:p-12 space-y-10"
          style={{
            boxShadow:
              "0 0 60px hsl(217 91% 60% / 0.06), 0 0 0 1px hsl(217 91% 60% / 0.10)",
          }}
        >
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}
