import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
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

const TOTAL = featuresMeta.length;

/** Clamp a number between [min, max] */
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/** Smooth-step interpolation for a natural ease in/out */
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export default function WhyChooseSection() {
  const { t, i18n } = useTranslation();

  /* ── refs ──────────────────────────────────────── */
  const sectionRef   = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const navRefs      = useRef<(HTMLLIElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number | null>(null);

  /* ── state ─────────────────────────────────────── */
  const [activeIndex, setActiveIndex] = useState(0);
  const [rawProgress, setRawProgress] = useState(0); // 0-1 continuous
  const activeIndexRef = useRef(0);
  const rawProgressRef = useRef(0);

  const isRtl = i18n.language === "ar";

  /* ── update indicator bar ───────────────────────── */
  const updateNavIndicator = useCallback((index: number) => {
    setActiveIndex(index);
    activeIndexRef.current = index;
    const activeNav = navRefs.current[index];
    const indicator = indicatorRef.current;
    if (!activeNav || !indicator) return;
    indicator.style.top    = `${activeNav.offsetTop}px`;
    indicator.style.height = `${activeNav.offsetHeight}px`;
    indicator.style.backgroundColor = featuresMeta[index].accent;
  }, []);

  /* sync indicator on language change */
  useEffect(() => {
    updateNavIndicator(activeIndex);
  }, [activeIndex, updateNavIndicator, i18n.language]);

  /* ── main scroll engine ─────────────────────────── */
  useEffect(() => {
    const computeProgress = () => {
      const track = trackRef.current;
      if (!track) return;
      if (window.innerWidth < 1024) return;

      const rect       = track.getBoundingClientRect();
      const viewH      = window.innerHeight;
      const pinRange   = Math.max(rect.height - viewH, 1);
      const raw        = clamp(-rect.top / pinRange, 0, 1);

      /* only update state when it actually changes (avoid extra renders) */
      if (Math.abs(raw - rawProgressRef.current) > 0.0005) {
        rawProgressRef.current = raw;
        setRawProgress(raw);

        /* discrete step — snaps after crossing the halfway point of each zone */
        const zone = raw * TOTAL;
        const step = clamp(Math.floor(zone), 0, TOTAL - 1);
        if (step !== activeIndexRef.current) {
          updateNavIndicator(step);
        }
      }
    };

    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        computeProgress();
      });
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", computeProgress);
    computeProgress();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", computeProgress);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateNavIndicator]);

  /* ── nav click: scroll to that card's zone ──────── */
  const handleNavClick = useCallback((index: number) => {
    const track = trackRef.current;
    if (window.innerWidth < 1024 || !track) {
      updateNavIndicator(index);
      return;
    }
    const rect        = track.getBoundingClientRect();
    const viewH       = window.innerHeight;
    const pinRange    = Math.max(rect.height - viewH, 1);
    const targetProg  = (index + 0.5) / TOTAL;
    const targetScroll = window.scrollY + rect.top + targetProg * pinRange;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    updateNavIndicator(index);
  }, [updateNavIndicator]);

  /* ── per-card visual values derived from rawProgress ── */
  const getCardStyle = (index: number) => {
    const zoneSize  = 1 / TOTAL;
    const zoneStart = index * zoneSize;
    const zoneEnd   = zoneStart + zoneSize;
    const midIn     = zoneStart + zoneSize * 0.18; // enter transition ends
    const midOut    = zoneEnd   - zoneSize * 0.18; // exit transition starts

    // How "present" this card is (0 = fully gone, 1 = fully shown)
    const enterP = smoothstep(zoneStart, midIn, rawProgress);
    const exitP  = 1 - smoothstep(midOut, zoneEnd, rawProgress);
    const presence = Math.min(enterP, exitP);

    const isCurrent  = activeIndex === index;
    const isBefore   = index < activeIndex;

    // On mobile we don't use scroll-driven values — just stack with CSS
    const opacity     = isCurrent ? 1 : isBefore ? 0 : 0;
    const translateY  = isCurrent ? 0 : isBefore ? -32 : 32;
    const scale       = isCurrent ? 1 : 0.94;

    return { opacity, translateY, scale, presence };
  };

  return (
    <section
      id="why-aero"
      ref={sectionRef}
      aria-labelledby="why-heading"
      className="relative"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-[1160px]">
        {/* 320vh gives a relaxed, deliberate scroll pace on desktop */}
        <div ref={trackRef} className="relative lg:min-h-[320vh]">

          {/* Sticky viewport frame */}
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center py-16 lg:py-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* ── LEFT: Header + Nav ───────────────────── */}
              <div className="lg:col-span-5 flex flex-col justify-start">

                {/* Badge */}
                <p
                  aria-hidden="true"
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20 w-fit"
                >
                  {t("why.badge")}
                </p>

                {/* Heading */}
                <h2
                  id="why-heading"
                  className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-foreground mb-4 tracking-tight leading-[1.18]"
                >
                  {t("why.title")}{" "}
                  <span className="gradient-primary-text">
                    {t("why.title.highlight")}
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
                  {t("why.subtitle")}
                </p>

                {/* ── Desktop Sidebar Nav ──────────────── */}
                <div className="hidden lg:block relative pl-1">
                  {/* static track */}
                  <div
                    className={`absolute top-0 bottom-0 w-[2px] bg-white/[0.07] ${
                      isRtl ? "right-0" : "left-0"
                    }`}
                  />

                  {/* animated indicator bar — position + color driven by CSS transition */}
                  <div
                    ref={indicatorRef}
                    className={`absolute w-[2px] rounded-full transition-[top,height,background-color] duration-500 ease-out ${
                      isRtl ? "right-0" : "left-0"
                    }`}
                    style={{ backgroundColor: featuresMeta[activeIndex].accent }}
                  />

                  <ul className="flex flex-col gap-1 list-none p-0 m-0">
                    {featuresMeta.map((feature, i) => {
                      const isActive = activeIndex === i;
                      return (
                        <li
                          key={feature.id}
                          ref={(el) => { navRefs.current[i] = el; }}
                          onClick={() => handleNavClick(i)}
                          className={`flex items-center gap-3.5 py-3.5 cursor-pointer select-none transition-all duration-400 ${
                            isRtl ? "pr-5" : "pl-5"
                          }`}
                        >
                          {/* Icon */}
                          <div
                            className="w-5 h-5 shrink-0 transition-all duration-400"
                            style={{
                              color: isActive
                                ? feature.accent
                                : "var(--muted-foreground, #838d9e)",
                              transform: isActive ? "scale(1.15)" : "scale(1)",
                              filter: isActive
                                ? `drop-shadow(0 0 6px ${feature.accent}80)`
                                : "none",
                            }}
                          >
                            {feature.icon}
                          </div>

                          {/* Label */}
                          <span
                            className="text-sm font-medium transition-all duration-400"
                            style={{
                              color: isActive
                                ? feature.accent
                                : "var(--muted-foreground, #838d9e)",
                              fontWeight: isActive ? 600 : 400,
                              letterSpacing: isActive ? "0.01em" : "0",
                            }}
                          >
                            {t(feature.titleKey)}
                          </span>

                          {/* Active dot pulse */}
                          {isActive && (
                            <span
                              className="ml-auto w-1.5 h-1.5 rounded-full shrink-0 animate-[glow-pulse_2s_ease-in-out_infinite]"
                              style={{ backgroundColor: feature.accent }}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* ── Mobile Tab Dots ──────────────────── */}
                <div className="flex lg:hidden gap-2 mt-2">
                  {featuresMeta.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => updateNavIndicator(i)}
                      aria-label={t(f.titleKey)}
                      className="transition-all duration-300"
                      style={{
                        width:  activeIndex === i ? "24px" : "8px",
                        height: "8px",
                        borderRadius: "999px",
                        backgroundColor:
                          activeIndex === i ? f.accent : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Card Stack ────────────────────── */}
              <div className="lg:col-span-7 relative">

                {/* Desktop: absolute stack / Mobile: single shown card */}
                <div className="relative min-h-[440px] lg:h-[440px]">

                  {/* Mobile: simple sliding carousel — only active card shown */}
                  <div className="lg:hidden overflow-hidden">
                    {featuresMeta.map((feature, index) => {
                      const isActive = activeIndex === index;
                      return (
                        <article
                          key={feature.id}
                          aria-hidden={!isActive}
                          className="rounded-2xl p-7 border flex flex-col justify-between shadow-xl"
                          style={{
                            display: isActive ? "flex" : "none",
                            background: "var(--panel, #0d1016)",
                            borderColor: feature.accent,
                            boxShadow: `0 20px 50px -15px ${feature.accent}30`,
                          }}
                        >
                          <MobileCardInner feature={feature} t={t} />
                        </article>
                      );
                    })}
                  </div>

                  {/* Desktop: scroll-driven animated stack */}
                  {featuresMeta.map((feature, index) => {
                    const { opacity, translateY, scale } = getCardStyle(index);
                    const isCurrent = activeIndex === index;

                    return (
                      <article
                        key={feature.id}
                        aria-hidden={!isCurrent}
                        className="hidden lg:flex lg:absolute lg:inset-0 rounded-2xl p-7 sm:p-8 border flex-col justify-between shadow-2xl"
                        style={{
                          opacity,
                          transform: `translateY(${translateY}px) scale(${scale})`,
                          transition:
                            "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
                          pointerEvents: isCurrent ? "auto" : "none",
                          zIndex: isCurrent ? 20 : index < activeIndex ? 10 : 0,
                          background: "var(--panel, #0d1016)",
                          borderColor: isCurrent
                            ? feature.accent
                            : "var(--line, rgba(232,236,243,0.09))",
                          boxShadow: isCurrent
                            ? `0 20px 60px -15px ${feature.accent}35, 0 0 0 1px ${feature.accent}25`
                            : "none",
                        }}
                      >
                        {/* Accent glow strip at top */}
                        {isCurrent && (
                          <div
                            className="absolute top-0 left-6 right-6 h-[1px] rounded-full"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${feature.accent}70, transparent)`,
                            }}
                          />
                        )}

                        <DesktopCardInner
                          feature={feature}
                          t={t}
                          isCurrent={isCurrent}
                        />
                      </article>
                    );
                  })}
                </div>

                {/* Progress bar — desktop only, sits below the card */}
                <div className="hidden lg:block mt-5 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width,background-color] duration-500 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / TOTAL) * 100}%`,
                      backgroundColor: featuresMeta[activeIndex].accent,
                    }}
                  />
                </div>

                {/* Step counter — desktop only */}
                <div className="hidden lg:flex items-center justify-between mt-3">
                  <span className="font-mono text-[11px] text-muted-foreground/50 tracking-widest">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-[11px] tracking-widest font-semibold transition-colors duration-500"
                    style={{ color: featuresMeta[activeIndex].accent }}
                  >
                    {featuresMeta[activeIndex].tag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   Sub-components — split out to keep JSX readable
───────────────────────────────────────────────────── */

function CardHeader({
  feature,
  isCurrent = true,
}: {
  feature: FeatureMeta;
  isCurrent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground select-none">
        {feature.code} —{" "}
        <span style={{ color: feature.accent }} className="font-semibold">
          {feature.tag}
        </span>
      </span>
      <div
        className="w-9 h-9 shrink-0 transition-transform duration-300"
        style={{
          color: feature.accent,
          filter: isCurrent
            ? `drop-shadow(0 0 8px ${feature.accent}60)`
            : "none",
        }}
      >
        {feature.icon}
      </div>
    </div>
  );
}

function CardPoints({
  feature,
  t,
}: {
  feature: FeatureMeta;
  t: (k: string) => string;
}) {
  return (
    <ul className="flex flex-col gap-2.5 pt-4 border-t border-white/[0.08] list-none p-0 m-0">
      {feature.pointKeys.map((key, i) => (
        <li
          key={key}
          className="flex items-center gap-3 text-sm text-foreground/90 font-medium"
          style={{ transitionDelay: `${i * 60}ms` }}
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
  );
}

function DesktopCardInner({
  feature,
  t,
  isCurrent,
}: {
  feature: FeatureMeta;
  t: (k: string) => string;
  isCurrent: boolean;
}) {
  return (
    <>
      <div>
        <CardHeader feature={feature} isCurrent={isCurrent} />
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight">
          {t(feature.titleKey)}
        </h3>
        <p className="text-[14.5px] leading-relaxed text-muted-foreground mb-6 max-w-[54ch]">
          {t(feature.descKey)}
        </p>
      </div>
      <CardPoints feature={feature} t={t} />
    </>
  );
}

function MobileCardInner({
  feature,
  t,
}: {
  feature: FeatureMeta;
  t: (k: string) => string;
}) {
  return (
    <>
      <div>
        <CardHeader feature={feature} />
        <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
          {t(feature.titleKey)}
        </h3>
        <p className="text-[14.5px] leading-relaxed text-muted-foreground mb-6">
          {t(feature.descKey)}
        </p>
      </div>
      <CardPoints feature={feature} t={t} />
    </>
  );
}
