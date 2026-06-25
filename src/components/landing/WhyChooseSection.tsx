import { Zap, Cpu, Layers, HeartHandshake, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

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

const trustStatsMeta = [
  { value: "150+", labelKey: "why.trust.projects" },
  { value: "50+", labelKey: "why.trust.clients" },
  { value: "8+", labelKey: "why.trust.years" },
  { value: "15+", labelKey: "why.trust.team" },
];

export default function WhyChooseSection() {
  const { t } = useTranslation();

  return (
    <section id="why-aero" className="py-24 relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-0 w-[500px] h-[500px]"
        style={{
          background: "radial-gradient(circle, hsl(189 94% 43% / 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20">
            {t("why.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t("why.title")}{" "}
            <span className="gradient-primary-text">{t("why.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("why.subtitle")}
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {featuresMeta.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.titleKey}
                className="group glass rounded-2xl p-7 hover:border-aero-blue/25 transition-all duration-300 hover:-translate-y-0.5"
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

        {/* Trust stats strip */}
        <div className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustStatsMeta.map((stat, i) => (
            <div key={stat.labelKey} className="relative">
              {i !== 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border" />
              )}
              <div className="text-3xl font-bold gradient-primary-text mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
