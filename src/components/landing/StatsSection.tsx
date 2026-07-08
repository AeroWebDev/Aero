import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// TODO: Replace these placeholders with real client metrics from the team before launch.
const statsMeta = [
  { value: "[TBD]", labelKey: "why.trust.projects" },
  { value: "[TBD]", labelKey: "why.trust.clients" },
  { value: "[TBD]", labelKey: "why.trust.years" },
  { value: "[TBD]", labelKey: "why.trust.team" },
];

export default function StatsSection() {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-12 border-y border-border/40 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsMeta.map((stat, i) => (
            <div key={stat.labelKey} className={`animate-on-scroll anim-delay-${i + 1} text-center relative`}>
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border/50" />
              )}
              <div className="text-4xl sm:text-5xl font-extrabold gradient-primary-text mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
