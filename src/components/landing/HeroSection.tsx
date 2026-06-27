import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

const techBadges = [
  { label: "React", delay: "0s" },
  { label: "Node.js", delay: "0.5s" },
  { label: "TypeScript", delay: "1s" },
  { label: "AWS", delay: "1.5s" },
  { label: "Next.js", delay: "0.8s" },
  { label: "PostgreSQL", delay: "0.3s" },
];

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >

      </div>

      {/* Floating tech badges */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {techBadges.map((badge, i) => {
          const positions = [
            { top: "18%", left: "8%" },
            { top: "30%", right: "7%" },
            { top: "60%", left: "5%" },
            { top: "55%", right: "9%" },
            { top: "75%", left: "14%" },
            { top: "20%", right: "15%" },
          ];
          const pos = positions[i];
          return (
            <div
              key={badge.label}
              className="absolute glass rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground animate-float hidden lg:flex items-center gap-1.5"
              style={{ ...pos, animationDelay: badge.delay }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-aero-blue inline-block"
                style={{ boxShadow: "0 0 6px hsl(217 91% 60% / 0.8)" }}
              />
              {badge.label}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-medium text-aero-cyan border-aero-cyan/20 border">
          <span className="w-2 h-2 rounded-full bg-aero-cyan animate-pulse" />
          {t("hero.badge")}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 max-w-5xl mx-auto">
          {t("hero.headline")}{" "}
          <span className="gradient-primary-text">{t("hero.headline.highlight")}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("hero.subheadline")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-primary text-aero-dark hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg"
            style={{ boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" }}
          >
            {t("hero.cta.primary")}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm glass border border-border text-foreground hover:border-aero-blue/40 hover:text-aero-blue transition-all duration-200"
          >
            <Play className="w-4 h-4" />
            {t("hero.cta.secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
