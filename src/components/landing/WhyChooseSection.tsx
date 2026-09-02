import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

interface FeatureMeta {
  id: string;
  code: string;
  tag: string;
  titleKey: string;
  descKey: string;
  pointKeys: string[];
  accent: string;
  icon: ReactNode;
}

const featuresMeta: FeatureMeta[] = [
  {
    id: "card-1",
    code: "ADV.01",
    tag: "SPEED",
    titleKey: "why.fast.title",
    descKey: "why.fast.description",
    pointKeys: ["why.fast.point1", "why.fast.point2", "why.fast.point3"],
    accent: "#4f8ef7",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
      </svg>
    ),
  },
  {
    id: "card-2",
    code: "ADV.02",
    tag: "TECH",
    titleKey: "why.tech.title",
    descKey: "why.tech.description",
    pointKeys: ["why.tech.point1", "why.tech.point2", "why.tech.point3"],
    accent: "#22d3ee",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M7 3v2M12 3v2M17 3v2M7 19v2M12 19v2M17 19v2M3 7h2M3 12h2M3 17h2M19 7h2M19 12h2M19 17h2" />
      </svg>
    ),
  },
  {
    id: "card-3",
    code: "ADV.03",
    tag: "SCALE",
    titleKey: "why.scale.title",
    descKey: "why.scale.description",
    pointKeys: ["why.scale.point1", "why.scale.point2", "why.scale.point3"],
    accent: "#a78bfa",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    ),
  },
  {
    id: "card-4",
    code: "ADV.04",
    tag: "SUPPORT",
    titleKey: "why.support.title",
    descKey: "why.support.description",
    pointKeys: ["why.support.point1", "why.support.point2", "why.support.point3"],
    accent: "#34d399",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        <path d="M9 10.5l2 2 3-3.5" />
      </svg>
    ),
  },
];

export default function WhyChooseSection() {
  const { t, i18n } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLLIElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const isRtl = i18n.language === "ar";
  const total = featuresMeta.length;

  const updateNavIndicator = useCallback(
    (index: number) => {
      setActiveIndex(index);
      activeIndexRef.current = index;
      const activeNav = navRefs.current[index];
      const indicator = indicatorRef.current;
      if (!activeNav || !indicator) return;

      indicator.style.top = `${activeNav.offsetTop}px`;
      indicator.style.height = `${activeNav.offsetHeight}px`;
      indicator.style.backgroundColor = featuresMeta[index].accent;
    },
    []
  );

  useEffect(() => {
    updateNavIndicator(activeIndex);
  }, [activeIndex, updateNavIndicator, i18n.language]);

  useEffect(() => {
    let ticking = false;

    const renderScroll = () => {
      const track = trackRef.current;
      if (!track) return;

      if (window.innerWidth < 1024) return;

      const rect = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const pinRange = Math.max(rect.height - viewportHeight, 1);
      const raw = -rect.top / pinRange;
      const progress = Math.min(Math.max(raw, 0), 1);

      // Snap cleanly into discrete step as user scrolls a bit
      const targetStep = Math.min(Math.floor(progress * total), total - 1);

      if (targetStep !== activeIndexRef.current) {
        updateNavIndicator(targetStep);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          renderScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onResize = () => {
      renderScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    renderScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [total, updateNavIndicator]);

  const handleNavClick = (index: number) => {
    const track = trackRef.current;
    if (window.innerWidth < 1024 || !track) {
      updateNavIndicator(index);
      return;
    }

    const rect = track.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const pinRange = Math.max(rect.height - viewportHeight, 1);
    const targetProgress = (index + 0.5) / total;
    const targetScroll = window.scrollY + rect.top + targetProgress * pinRange;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    updateNavIndicator(index);
  };

  return (
    <section
      id="why-aero"
      aria-labelledby="why-heading"
      className="relative"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-[1160px]">
        {/* Desktop: 300vh scroll runway for deliberate pacing. Mobile: standard height */}
        <div
          ref={trackRef}
          className="relative lg:min-h-[300vh]"
        >
          <div
            className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center py-16 lg:py-0"
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Sticky Column */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                <p
                  aria-hidden="true"
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20 w-fit"
                >
                  {t("why.badge")}
                </p>

                <h2
                  id="why-heading"
                  className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-foreground mb-4 tracking-tight leading-[1.18]"
                >
                  {t("why.title")}{" "}
                  <span className="gradient-primary-text">
                    {t("why.title.highlight")}
                  </span>
                </h2>

                <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
                  {t("why.subtitle")}
                </p>

                {/* Navigation Indicator List (Desktop) */}
                <div className="hidden lg:block relative pl-1">
                  <div
                    className={`absolute top-0 bottom-0 w-[2px] bg-white/[0.08] ${
                      isRtl ? "right-0" : "left-0"
                    }`}
                  />
                  <div
                    ref={indicatorRef}
                    className={`absolute w-[2px] rounded-full transition-all duration-500 ease-out ${
                      isRtl ? "right-0" : "left-0"
                    }`}
                    style={{
                      backgroundColor: featuresMeta[activeIndex].accent,
                    }}
                  />
                  <ul className="flex flex-col gap-1 list-none p-0 m-0">
                    {featuresMeta.map((feature, i) => {
                      const isActive = activeIndex === i;
                      return (
                        <li
                          key={feature.id}
                          ref={(el) => {
                            navRefs.current[i] = el;
                          }}
                          onClick={() => handleNavClick(i)}
                          className={`flex items-center gap-3.5 py-3 cursor-pointer transition-all duration-300 select-none ${
                            isRtl ? "pr-5" : "pl-5"
                          }`}
                        >
                          <div
                            className="w-5 h-5 transition-colors duration-300 shrink-0"
                            style={{
                              color: isActive
                                ? feature.accent
                                : "var(--muted-foreground, #838d9e)",
                            }}
                          >
                            {feature.icon}
                          </div>
                          <span
                            className={`text-sm font-medium transition-colors duration-300 ${
                              isActive
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground/80"
                            }`}
                            style={{
                              color: isActive ? feature.accent : undefined,
                            }}
                          >
                            {t(feature.titleKey)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Right Card Stack Column */}
              <div className="lg:col-span-7 relative">
                {/* Stack on desktop / Grid on mobile */}
                <div className="relative min-h-[420px] lg:h-[420px] grid grid-cols-1 md:grid-cols-2 lg:block gap-6">
                  {featuresMeta.map((feature, index) => {
                    const isCurrent = activeIndex === index;
                    const isPast = index < activeIndex;

                    return (
                      <article
                        key={feature.id}
                        className={`lg:absolute lg:inset-0 rounded-2xl p-7 sm:p-8 border flex flex-col justify-between shadow-2xl transition-all duration-500 ease-out ${
                          isCurrent
                            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto z-20"
                            : isPast
                            ? "opacity-0 -translate-y-8 scale-95 pointer-events-none z-10"
                            : "opacity-0 translate-y-8 scale-95 pointer-events-none z-0"
                        }`}
                        style={{
                          background: "var(--panel, #0d1016)",
                          borderColor: isCurrent
                            ? feature.accent
                            : "var(--line, rgba(232,236,243,0.09))",
                          boxShadow: isCurrent
                            ? `0 20px 50px -15px ${feature.accent}30`
                            : "none",
                          "--card-accent": feature.accent,
                        } as React.CSSProperties}
                      >
                        <div>
                          {/* Card Header: Code & Accent Icon */}
                          <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground select-none">
                              {feature.code} —{" "}
                              <span
                                style={{ color: feature.accent }}
                                className="font-semibold"
                              >
                                {feature.tag}
                              </span>
                            </span>
                            <div
                              className="w-9 h-9 shrink-0 transition-transform duration-300"
                              style={{ color: feature.accent }}
                            >
                              {feature.icon}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight">
                            {t(feature.titleKey)}
                          </h3>

                          {/* Description */}
                          <p className="text-[14.5px] leading-relaxed text-muted-foreground mb-6 max-w-[54ch]">
                            {t(feature.descKey)}
                          </p>
                        </div>

                        {/* Bullet Points */}
                        <ul className="flex flex-col gap-2.5 pt-4 border-t border-white/[0.08] list-none p-0 m-0">
                          {feature.pointKeys.map((key) => (
                            <li
                              key={key}
                              className="flex items-center gap-3 text-sm text-foreground/90 font-medium"
                            >
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                style={{
                                  background: `${feature.accent}20`,
                                  color: feature.accent,
                                }}
                              >
                                <Check className="w-3 h-3 stroke-[2.5]" />
                              </div>
                              <span>{t(key)}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
