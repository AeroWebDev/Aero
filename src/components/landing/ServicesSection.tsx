import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ServiceItem {
  code: string;
  tag: string;
  accent: string;
  titleKey: string;
  descKey: string;
  readoutLabelKey: string;
  readoutValueKey: string;
  icon: ReactNode;
}

const servicesMeta: ServiceItem[] = [
  {
    code: "SYS.01",
    tag: "WEB",
    accent: "#4f8ef7",
    titleKey: "services.webDev.title",
    descKey: "services.webDev.description",
    readoutLabelKey: "services.webDev.readoutLabel",
    readoutValueKey: "services.webDev.readoutValue",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M3 8.5h18" />
        <circle cx="6" cy="6.2" r="0.6" fill="currentColor" stroke="none" />
        <path d="M8 13l2.2 2.2L8 17.4M13 17.4h3" />
      </svg>
    ),
  },
  {
    code: "SYS.02",
    tag: "SAAS",
    accent: "#22d3ee",
    titleKey: "services.saas.title",
    descKey: "services.saas.description",
    readoutLabelKey: "services.saas.readoutLabel",
    readoutValueKey: "services.saas.readoutValue",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="4.5" rx="1" />
        <rect x="4" y="10" width="16" height="4.5" rx="1" />
        <rect x="4" y="16" width="16" height="4.5" rx="1" />
        <circle cx="7.2" cy="6.25" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="7.2" cy="12.25" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="7.2" cy="18.25" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    code: "SYS.03",
    tag: "UXD",
    accent: "#a78bfa",
    titleKey: "services.design.title",
    descKey: "services.design.description",
    readoutLabelKey: "services.design.readoutLabel",
    readoutValueKey: "services.design.readoutValue",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l1.1-4.2L16.8 4.1a1.4 1.4 0 0 1 2 0l1.1 1.1a1.4 1.4 0 0 1 0 2L8.2 18.9 4 20z" />
        <path d="M14.7 6.2l3.1 3.1" />
      </svg>
    ),
  },
  {
    code: "SYS.04",
    tag: "ECOM",
    accent: "#f59e0b",
    titleKey: "services.ecommerce.title",
    descKey: "services.ecommerce.description",
    readoutLabelKey: "services.ecommerce.readoutLabel",
    readoutValueKey: "services.ecommerce.readoutValue",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 5h2l1.6 10.2a1.6 1.6 0 0 0 1.6 1.4h8.3a1.6 1.6 0 0 0 1.6-1.3L20.5 8H6.3" />
        <circle cx="9.5" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </svg>
    ),
  },
  {
    code: "SYS.05",
    tag: "API",
    accent: "#34d399",
    titleKey: "services.api.title",
    descKey: "services.api.description",
    readoutLabelKey: "services.api.readoutLabel",
    readoutValueKey: "services.api.readoutValue",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="6" r="2" />
        <circle cx="18.5" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M7.3 7.1L10.3 16.4M16.7 7.1L13.7 16.4M7.5 6h11" />
      </svg>
    ),
  },
  {
    code: "SYS.06",
    tag: "ADV",
    accent: "#f472b6",
    titleKey: "services.consulting.title",
    descKey: "services.consulting.description",
    readoutLabelKey: "services.consulting.readoutLabel",
    readoutValueKey: "services.consulting.readoutValue",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.9 4.4L18.5 9l-4.6 1.6L12 15l-1.9-4.4L5.5 9l4.6-1.6L12 3z" />
        <path d="M19 15.5l0.9 2.1 2.1 0.9-2.1 0.9-0.9 2.1-0.9-2.1-2.1-0.9 2.1-0.9z" />
      </svg>
    ),
  },
];

const delays = [
  "anim-delay-1",
  "anim-delay-2",
  "anim-delay-3",
  "anim-delay-4",
  "anim-delay-5",
  "anim-delay-6",
];

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export default function ServicesSection({
  onSelectService,
}: ServicesSectionProps) {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="services"
      aria-labelledby="services-heading"
      className="animate-section-entry py-24 relative overflow-hidden"
    >
      {/* Subtle radial aura */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-25"
        style={{
          background:
            "radial-gradient(ellipse, hsl(217 91% 60% / 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232, 236, 243, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 236, 243, 0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-[1160px]">
        <div className="text-center mb-16">
          <p
            aria-hidden="true"
            className="animate-on-scroll inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20"
          >
            {t("services.badge")}
          </p>

          <h2
            id="services-heading"
            className="animate-on-scroll anim-delay-1 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
          >
            {t("services.title")}{" "}
            <span className="gradient-primary-text">
              {t("services.title.highlight")}
            </span>
          </h2>

          <p className="animate-on-scroll anim-delay-2 text-muted-foreground text-lg max-w-xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesMeta.map((service, index) => (
            <a
              key={service.titleKey}
              href="#contact"
              onClick={() => onSelectService?.(t(service.titleKey))}
              className={`animate-on-scroll ${delays[index]} group relative rounded-2xl p-7 sm:p-8 border transition-all duration-300 hover:-translate-y-1 block no-underline flex flex-col justify-between`}
              style={
                {
                  background: "var(--panel, #0d1016)",
                  borderColor: "var(--line, rgba(232,236,243,0.09))",
                  "--card-accent": service.accent,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = service.accent;
                e.currentTarget.style.backgroundColor = "#10141b";
                e.currentTarget.style.boxShadow = `0 8px 30px -10px ${service.accent}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,236,243,0.09)";
                e.currentTarget.style.backgroundColor = "#0d1016";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div>
                {/* Top bar with system code and custom icon */}
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground select-none">
                    {service.code} —{" "}
                    <span style={{ color: service.accent }} className="font-semibold">
                      {service.tag}
                    </span>
                  </span>
                  <div
                    className="w-[34px] h-[34px] transition-transform duration-300 group-hover:scale-110"
                    style={{ color: service.accent }}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-foreground mb-2.5 tracking-tight group-hover:text-foreground transition-colors">
                  {t(service.titleKey)}
                </h3>

                {/* Service Description */}
                <p className="text-[14.5px] leading-relaxed text-muted-foreground mb-7">
                  {t(service.descKey)}
                </p>
              </div>

              {/* Readout bar */}
              <div className="flex items-baseline justify-between pt-4 border-t border-white/[0.1] font-mono mt-auto select-none">
                <span className="text-[11px] text-muted-foreground">
                  {t(service.readoutLabelKey)}
                </span>
                <span
                  className="text-[12.5px] font-medium tracking-tight"
                  style={{ color: service.accent }}
                >
                  {t(service.readoutValueKey)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}