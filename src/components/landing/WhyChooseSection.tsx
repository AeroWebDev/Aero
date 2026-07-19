import { Zap, Cpu, Layers, HeartHandshake, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const featuresMeta = [
  {
    icon: Zap,
    titleKey: "why.fast.title",
    descKey: "why.fast.description",
    pointKeys: ["why.fast.point1", "why.fast.point2", "why.fast.point3"],
    color: "hsl(217 91% 60%)",
  },
  {
    icon: Cpu,
    titleKey: "why.tech.title",
    descKey: "why.tech.description",
    pointKeys: ["why.tech.point1", "why.tech.point2", "why.tech.point3"],
    color: "hsl(189 94% 43%)",
  },
  {
    icon: Layers,
    titleKey: "why.scale.title",
    descKey: "why.scale.description",
    pointKeys: ["why.scale.point1", "why.scale.point2", "why.scale.point3"],
    color: "hsl(250 80% 65%)",
  },
  {
    icon: HeartHandshake,
    titleKey: "why.support.title",
    descKey: "why.support.description",
    pointKeys: ["why.support.point1", "why.support.point2", "why.support.point3"],
    color: "hsl(160 84% 45%)",
  },
];

export default function WhyChooseSection() {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="why-aero" className="animate-section-entry py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20">
            {t("why.badge")}
          </div>
          <h2 className="animate-on-scroll anim-delay-1 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t("why.title")}{" "}
            <span className="gradient-primary-text">{t("why.title.highlight")}</span>
          </h2>
          <p className="animate-on-scroll anim-delay-2 text-muted-foreground text-lg max-w-xl mx-auto">
            {t("why.subtitle")}
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuresMeta.map((feature, index) => {
            const Icon = feature.icon;
            // Alternate left/right slide for visual variety
            const slideClass = index % 2 === 0 ? "animate-on-scroll-left" : "animate-on-scroll-right";
            const delayClass = `anim-delay-${Math.min(index + 1, 6)}`;
            return (
              <div
                key={feature.titleKey}
                className={`${slideClass} ${delayClass} group glass rounded-2xl p-7 hover:border-aero-blue/25 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `${feature.color}18`,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {t(feature.descKey)}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {feature.pointKeys.map((key) => (
                        <li key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-3.5 h-3.5 shrink-0" style={{ color: feature.color }} />
                          {t(key)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

