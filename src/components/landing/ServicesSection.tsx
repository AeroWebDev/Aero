import {
  Globe,
  LayoutDashboard,
  Palette,
  ShoppingCart,
  Plug,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const servicesMeta = [
  { icon: Globe, titleKey: "services.webDev.title", descKey: "services.webDev.description", color: "hsl(217 91% 60%)" },
  { icon: LayoutDashboard, titleKey: "services.saas.title", descKey: "services.saas.description", color: "hsl(189 94% 43%)" },
  { icon: Palette, titleKey: "services.design.title", descKey: "services.design.description", color: "hsl(250 80% 65%)" },
  { icon: ShoppingCart, titleKey: "services.ecommerce.title", descKey: "services.ecommerce.description", color: "hsl(32 95% 60%)" },
  { icon: Plug, titleKey: "services.api.title", descKey: "services.api.description", color: "hsl(160 84% 45%)" },
  { icon: MessageSquare, titleKey: "services.consulting.title", descKey: "services.consulting.description", color: "hsl(340 80% 60%)" },
];

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="services" className="py-24 relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-30"
        style={{
          background: "radial-gradient(ellipse, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20">
            {t("services.badge")}
          </div>
          <h2 className="animate-on-scroll anim-delay-1 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t("services.title")}{" "}
            <span className="gradient-primary-text">{t("services.title.highlight")}</span>
          </h2>
          <p className="animate-on-scroll anim-delay-2 text-muted-foreground text-lg max-w-xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesMeta.map((service, index) => {
            const Icon = service.icon;
            const delayClass = `anim-delay-${Math.min(index + 1, 6)}` as string;
            return (
              <a
                href="#contact"
                key={service.titleKey}
                onClick={() => onSelectService?.(t(service.titleKey))}
                className={`animate-on-scroll ${delayClass} group glass rounded-2xl p-7 hover:border-aero-blue/30 hover:-translate-y-1 transition-all duration-300 service-card-hover block no-underline`}
                style={{
                  "--hover-color": `${service.color}22`
                } as React.CSSProperties}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `${service.color}18`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <Icon style={{ width: '27px', height: '27px', color: service.color }} strokeWidth={1.75} />
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(service.descKey)}
                </p>

                {/* Bottom gradient line */}
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

