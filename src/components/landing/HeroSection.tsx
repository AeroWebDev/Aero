import { ArrowRight, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SideRays from "@/components/background/SideRays";
import DotField from "@/components/background/DotField";

export default function HeroSection() {
  const { t } = useTranslation();
  const ref = useScrollAnimation(0.05);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="animate-section-entry relative isolate min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background */}

      <div className="absolute inset-0 -z-10">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={3}
          spread={3}
          origin="top-right"
          tilt={0}
          saturation={2}
          blend={0.75}
          falloff={0.5}
          opacity={1}
        />
      </div>


      <div className="absolute inset-0 -z-10 opacity-50">
        <DotField
          dotRadius={2}
          dotSpacing={14}
          bulgeStrength={86}
          glowRadius={120}
          sparkle
          waveAmplitude={0}
          cursorRadius={300}
          cursorForce={1}
          bulgeOnly
          gradientFrom="#2563EB"
          gradientTo="#06B6D4"
          glowColor="#0B1220"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/10 via-background/35 to-background" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-[fade-up_0.9s_ease-out_forwards] opacity-0 anim-delay-1 inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-medium text-aero-cyan border-aero-cyan/20 border">
          <span className="w-2 h-2 rounded-full bg-aero-cyan animate-pulse" />
          {t("hero.badge")}
        </div>

        {/* Headline */}
        <h1 className="animate-[fade-up_1.1s_ease-out_forwards] opacity-0 anim-delay-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 max-w-5xl mx-auto">
          {t("hero.headline")}{" "}
          <span className="gradient-primary-text">{t("hero.headline.highlight")}</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-[fade-up_1.3s_ease-out_forwards] opacity-0 anim-delay-3 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("hero.subheadline")}
        </p>

        {/* CTA Buttons */}
        <div className="animate-[fade-up_1.5s_ease-out_forwards] opacity-0 anim-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-primary text-white hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg"
            style={{ boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" }}
          >
            {t("hero.cta.primary")}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm glass border border-border text-foreground hover:border-aero-blue/40 hover:text-aero-blue transition-all duration-200"
          >
            <ArrowDown className="w-4 h-4" />
            {t("hero.cta.secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}

