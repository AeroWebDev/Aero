import { renderToString } from "react-dom/server";
import { useState, useEffect, createElement } from "react";
import { useLocation, Routes, Route, StaticRouter } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
import { Zap, Sun, Moon, X, Menu, CheckCircle, ArrowRight, Play, Globe, LayoutDashboard, Palette, ShoppingCart, Plug, MessageSquare, Cpu, Layers, HeartHandshake, Check, ArrowUpRight, Send, Mail, MessageCircle, MapPin, Heart } from "lucide-react";
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "i18next";
const fallbackLng = "en";
const supportedLngs = ["en", "ar"];
const normalizeLanguage = (language) => {
  const normalized = language?.split("-")[0];
  return supportedLngs.includes(normalized) ? normalized : void 0;
};
const getLanguageDirection = (language) => {
  return normalizeLanguage(language) === "ar" ? "rtl" : "ltr";
};
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const baseUrl = typeof import.meta !== "undefined" && "/" ? "/".endsWith("/") ? "/" : `${"/"}/` : "/";
void i18n.use(initReactI18next).init({
  fallbackLng,
  supportedLngs,
  // 当前模板用 flat dotted key + 单 namespace。两个 separator 都关掉，
  // 让整个字符串作字面 key，不被切成 ns/key/subkey。
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false }
});
if (isBrowser) {
  import("i18next-http-backend").then(({ default: HttpBackend }) => {
    import("i18next-browser-languagedetector").then(({ default: LanguageDetector }) => {
      void i18n.use(HttpBackend).use(LanguageDetector).init({
        fallbackLng,
        supportedLngs,
        backend: { loadPath: `${baseUrl}locales/{{lng}}.json` },
        detection: {
          order: ["cookie", "navigator", "htmlTag"],
          lookupCookie: "i18next",
          caches: ["cookie"],
          // 不支持的语言归一到 fallbackLng，避免 cookie 持久化无效语言串
          // （detector 缓存的是 i18n.language，而非 resolvedLanguage）。
          convertDetectedLanguage: (l) => normalizeLanguage(l) ?? fallbackLng
        },
        keySeparator: false,
        nsSeparator: false,
        interpolation: { escapeValue: false },
        react: { useSuspense: false }
      });
    });
  }).catch(() => {
  });
  const syncDocumentLanguage = (lng) => {
    const code = normalizeLanguage(lng) ?? fallbackLng;
    document.documentElement.lang = code;
    document.documentElement.dir = getLanguageDirection(code);
  };
  i18n.on(
    "initialized",
    () => syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language)
  );
  i18n.on("languageChanged", syncDocumentLanguage);
}
const LanguageSwitcher = ({ className }) => {
  const { i18n: i18n2 } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n2.resolvedLanguage ?? i18n2.language) ?? fallbackLng;
  const isArabic = currentLanguage === "ar";
  const handleToggle = () => {
    void i18n2.changeLanguage(isArabic ? "en" : "ar");
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleToggle,
      className: `rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${className ?? ""}`,
      "aria-label": isArabic ? "Switch to English" : "التبديل إلى العربية",
      children: isArabic ? "English" : "عربي"
    }
  );
};
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    return stored ?? "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => t === "dark" ? "light" : "dark");
  return { theme, toggle };
}
function Navbar() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navLinks = [
    { label: t("nav.services"), href: "#services", id: "services" },
    { label: t("nav.projects"), href: "#projects", id: "projects" },
    { label: t("nav.whyAero"), href: "#why-aero", id: "why-aero" },
    { label: t("nav.contact"), href: "#contact", id: "contact" }
  ];
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const sectionIds = ["services", "projects", "why-aero", "contact"];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong border-b border-border py-3" : "bg-transparent py-5"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between px-6", children: [
          /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg group-hover:glow-blue transition-all duration-300", children: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-aero-dark", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-foreground tracking-tight", children: [
              "Aero ",
              /* @__PURE__ */ jsx("span", { className: "gradient-primary-text", children: "Team" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-8", children: navLinks.map((link) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              className: `text-sm font-medium transition-colors duration-200 border-b-2 pb-0.5 ${activeSection === link.id ? "text-foreground border-aero-blue" : "text-muted-foreground hover:text-foreground border-transparent"}`,
              children: link.label
            },
            link.href
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggle,
                "aria-label": "Toggle theme",
                className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200",
                children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(LanguageSwitcher, { className: "h-9 text-sm bg-secondary border-border text-foreground" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#contact",
                className: "px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-primary text-aero-dark hover:opacity-90 transition-opacity duration-200 shadow-lg",
                children: t("nav.cta")
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "md:hidden text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => setMenuOpen(!menuOpen),
              "aria-label": "Toggle menu",
              children: menuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
            }
          )
        ] }),
        menuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden glass-strong border-t border-border px-6 py-4 flex flex-col gap-4", children: [
          navLinks.map((link) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              onClick: () => setMenuOpen(false),
              className: `text-sm font-medium transition-colors border-b pb-2 ${activeSection === link.id ? "text-foreground border-aero-blue" : "text-muted-foreground hover:text-foreground border-transparent"}`,
              children: link.label
            },
            link.href
          )),
          /* @__PURE__ */ jsx(LanguageSwitcher, { className: "bg-secondary border-border text-foreground" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: toggle,
              "aria-label": "Toggle theme",
              className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
              children: [
                theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" }),
                theme === "dark" ? "Light mode" : "Dark mode"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#contact",
              onClick: () => setMenuOpen(false),
              className: "mt-1 px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-primary text-aero-dark text-center",
              children: t("nav.cta")
            }
          )
        ] })
      ]
    }
  );
}
const techBadges = [
  { label: "React", delay: "0s" },
  { label: "Node.js", delay: "0.5s" },
  { label: "TypeScript", delay: "1s" },
  { label: "AWS", delay: "1.5s" },
  { label: "Next.js", delay: "0.8s" },
  { label: "PostgreSQL", delay: "0.3s" }
];
function HeroSection() {
  const { t } = useTranslation();
  const stats = [
    { value: t("hero.stats.projects.value"), label: t("hero.stats.projects.label") },
    { value: t("hero.stats.satisfaction.value"), label: t("hero.stats.satisfaction.label") },
    { value: t("hero.stats.experience.value"), label: t("hero.stats.experience.label") }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0",
          style: { background: "var(--gradient-hero)" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full animate-glow-pulse",
          style: {
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.15) 0%, transparent 70%)",
            filter: "blur(40px)"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full animate-glow-pulse",
          style: {
            background: "radial-gradient(circle, hsl(189 94% 43% / 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            animationDelay: "1.5s"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]",
          style: {
            background: "radial-gradient(ellipse, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
            filter: "blur(30px)"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.03]",
          style: {
            backgroundImage: `
              linear-gradient(hsl(210 40% 96%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(210 40% 96%) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", "aria-hidden": "true", children: techBadges.map((badge, i) => {
      const positions = [
        { top: "18%", left: "8%" },
        { top: "30%", right: "7%" },
        { top: "60%", left: "5%" },
        { top: "55%", right: "9%" },
        { top: "75%", left: "14%" },
        { top: "20%", right: "15%" }
      ];
      const pos = positions[i];
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute glass rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground animate-float hidden lg:flex items-center gap-1.5",
          style: { ...pos, animationDelay: badge.delay },
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "w-1.5 h-1.5 rounded-full bg-aero-blue inline-block",
                style: { boxShadow: "0 0 6px hsl(217 91% 60% / 0.8)" }
              }
            ),
            badge.label
          ]
        },
        badge.label
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 container mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-medium text-aero-cyan border-aero-cyan/20 border", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5" }),
        t("hero.badge")
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 max-w-5xl mx-auto", children: [
        t("hero.headline"),
        " ",
        /* @__PURE__ */ jsx("span", { className: "gradient-primary-text", children: t("hero.headline.highlight") })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed", children: t("hero.subheadline") }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-20", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#contact",
            className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-primary text-aero-dark hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg",
            style: { boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" },
            children: [
              t("hero.cta.primary"),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#projects",
            className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm glass border border-border text-foreground hover:border-aero-blue/40 hover:text-aero-blue transition-all duration-200",
            children: [
              /* @__PURE__ */ jsx(Play, { className: "w-4 h-4" }),
              t("hero.cta.secondary")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4 max-w-2xl mx-auto", children: stats.map((stat) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "glass rounded-2xl p-5 hover:border-aero-blue/30 hover:glow-subtle transition-all duration-300 group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl font-bold gradient-primary-text mb-1 group-hover:scale-105 transition-transform duration-200", children: stat.value }),
            /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-muted-foreground font-medium", children: stat.label })
          ]
        },
        stat.label
      )) })
    ] })
  ] });
}
const servicesMeta = [
  { icon: Globe, titleKey: "services.webDev.title", descKey: "services.webDev.description", color: "hsl(217 91% 60%)" },
  { icon: LayoutDashboard, titleKey: "services.saas.title", descKey: "services.saas.description", color: "hsl(189 94% 43%)" },
  { icon: Palette, titleKey: "services.design.title", descKey: "services.design.description", color: "hsl(250 80% 65%)" },
  { icon: ShoppingCart, titleKey: "services.ecommerce.title", descKey: "services.ecommerce.description", color: "hsl(32 95% 60%)" },
  { icon: Plug, titleKey: "services.api.title", descKey: "services.api.description", color: "hsl(160 84% 45%)" },
  { icon: MessageSquare, titleKey: "services.consulting.title", descKey: "services.consulting.description", color: "hsl(340 80% 60%)" }
];
function ServicesSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("section", { id: "services", className: "py-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-30",
        style: {
          background: "radial-gradient(ellipse, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20", children: t("services.badge") }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight", children: [
          t("services.title"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "gradient-primary-text", children: t("services.title.highlight") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: t("services.subtitle") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: servicesMeta.map((service) => {
        const Icon = service.icon;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group glass rounded-2xl p-7 hover:border-aero-blue/30 transition-all duration-300 hover:-translate-y-1 cursor-default",
            onMouseEnter: (e) => {
              e.currentTarget.style.boxShadow = `0 0 30px ${service.color}22`;
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.boxShadow = "";
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300",
                  style: {
                    background: `${service.color}18`,
                    border: `1px solid ${service.color}30`
                  },
                  children: /* @__PURE__ */ jsx(Icon, { style: { width: "27px", height: "27px", color: service.color }, strokeWidth: 1.75 })
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t(service.titleKey) }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: t(service.descKey) }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full",
                  style: { background: `linear-gradient(90deg, ${service.color}, transparent)` }
                }
              )
            ]
          },
          service.titleKey
        );
      }) })
    ] })
  ] });
}
const featuresMeta = [
  {
    icon: Zap,
    titleKey: "why.fast.title",
    descKey: "why.fast.description",
    pointKeys: ["why.fast.point1", "why.fast.point2", "why.fast.point3"],
    color: "hsl(217 91% 60%)"
  },
  {
    icon: Cpu,
    titleKey: "why.tech.title",
    descKey: "why.tech.description",
    pointKeys: ["why.tech.point1", "why.tech.point2", "why.tech.point3"],
    color: "hsl(189 94% 43%)"
  },
  {
    icon: Layers,
    titleKey: "why.scale.title",
    descKey: "why.scale.description",
    pointKeys: ["why.scale.point1", "why.scale.point2", "why.scale.point3"],
    color: "hsl(250 80% 65%)"
  },
  {
    icon: HeartHandshake,
    titleKey: "why.support.title",
    descKey: "why.support.description",
    pointKeys: ["why.support.point1", "why.support.point2", "why.support.point3"],
    color: "hsl(160 84% 45%)"
  }
];
const trustStatsMeta = [
  { value: "150+", labelKey: "why.trust.projects" },
  { value: "50+", labelKey: "why.trust.clients" },
  { value: "8+", labelKey: "why.trust.years" },
  { value: "15+", labelKey: "why.trust.team" }
];
function WhyChooseSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("section", { id: "why-aero", className: "py-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none absolute -top-40 left-0 w-[500px] h-[500px]",
        style: {
          background: "radial-gradient(circle, hsl(189 94% 43% / 0.06) 0%, transparent 70%)",
          filter: "blur(60px)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20", children: t("why.badge") }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight", children: [
          t("why.title"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "gradient-primary-text", children: t("why.title.highlight") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: t("why.subtitle") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-16", children: featuresMeta.map((feature) => {
        const Icon = feature.icon;
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "group glass rounded-2xl p-7 hover:border-aero-blue/25 transition-all duration-300 hover:-translate-y-0.5",
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300",
                  style: {
                    background: `${feature.color}18`,
                    border: `1px solid ${feature.color}30`
                  },
                  children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6", style: { color: feature.color }, strokeWidth: 1.75 })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t(feature.titleKey) }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: t(feature.descKey) }),
                /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2", children: feature.pointKeys.map((key) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 shrink-0", style: { color: feature.color } }),
                  t(key)
                ] }, key)) })
              ] })
            ] })
          },
          feature.titleKey
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: trustStatsMeta.map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        i !== 0 && /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border" }),
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold gradient-primary-text mb-1", children: stat.value }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground font-medium", children: t(stat.labelKey) })
      ] }, stat.labelKey)) })
    ] })
  ] });
}
const projectsMeta = [
  {
    nameKey: "projects.nexus.name",
    categoryKey: "projects.nexus.category",
    descKey: "projects.nexus.description",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    accentColor: "hsl(217 91% 60%)",
    mockupStyle: { background: "linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(217 91% 60% / 0.05))" },
    mockupLines: [
      { w: "60%", c: "hsl(217 91% 60% / 0.5)" },
      { w: "80%", c: "hsl(217 91% 60% / 0.3)" },
      { w: "45%", c: "hsl(217 91% 60% / 0.4)" }
    ],
    bars: [40, 70, 50, 90, 65, 80, 55]
  },
  {
    nameKey: "projects.shopflow.name",
    categoryKey: "projects.shopflow.category",
    descKey: "projects.shopflow.description",
    tags: ["Next.js", "Stripe", "MongoDB", "AWS"],
    accentColor: "hsl(32 95% 60%)",
    mockupStyle: { background: "linear-gradient(135deg, hsl(32 95% 60% / 0.15), hsl(32 95% 60% / 0.05))" },
    mockupLines: [
      { w: "70%", c: "hsl(32 95% 60% / 0.5)" },
      { w: "55%", c: "hsl(32 95% 60% / 0.3)" },
      { w: "85%", c: "hsl(32 95% 60% / 0.4)" }
    ],
    bars: [60, 45, 80, 55, 75, 40, 90]
  },
  {
    nameKey: "projects.vaultify.name",
    categoryKey: "projects.vaultify.category",
    descKey: "projects.vaultify.description",
    tags: ["React Native", "Python", "Plaid API", "GCP"],
    accentColor: "hsl(160 84% 45%)",
    mockupStyle: { background: "linear-gradient(135deg, hsl(160 84% 45% / 0.15), hsl(160 84% 45% / 0.05))" },
    mockupLines: [
      { w: "65%", c: "hsl(160 84% 45% / 0.5)" },
      { w: "90%", c: "hsl(160 84% 45% / 0.3)" },
      { w: "50%", c: "hsl(160 84% 45% / 0.4)" }
    ],
    bars: [55, 80, 60, 70, 45, 85, 65]
  },
  {
    nameKey: "projects.medcore.name",
    categoryKey: "projects.medcore.category",
    descKey: "projects.medcore.description",
    tags: ["Vue.js", "FastAPI", "PostgreSQL", "Docker"],
    accentColor: "hsl(250 80% 65%)",
    mockupStyle: { background: "linear-gradient(135deg, hsl(250 80% 65% / 0.15), hsl(250 80% 65% / 0.05))" },
    mockupLines: [
      { w: "75%", c: "hsl(250 80% 65% / 0.5)" },
      { w: "50%", c: "hsl(250 80% 65% / 0.3)" },
      { w: "80%", c: "hsl(250 80% 65% / 0.4)" }
    ],
    bars: [70, 50, 85, 40, 65, 90, 55]
  }
];
function ProjectsSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("section", { id: "projects", className: "py-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2",
        style: {
          background: "radial-gradient(circle, hsl(217 91% 60% / 0.06) 0%, transparent 70%)",
          filter: "blur(60px)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20", children: t("projects.badge") }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight", children: [
          t("projects.title"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "gradient-primary-text", children: t("projects.title.highlight") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: t("projects.subtitle") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: projectsMeta.map((project) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "group glass rounded-2xl overflow-hidden hover:border-aero-blue/25 transition-all duration-300 hover:-translate-y-1 cursor-default",
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative h-52 sm:h-60 w-full flex items-center justify-center overflow-hidden",
                style: project.mockupStyle,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "w-4/5 max-w-xs space-y-3 px-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full", style: { background: project.accentColor, opacity: 0.8 } }),
                      /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full flex-1", style: { background: `${project.accentColor}30` } })
                    ] }),
                    project.mockupLines.map((line, i) => /* @__PURE__ */ jsx("div", { className: "h-2.5 rounded-full", style: { width: line.w, background: line.c } }, i)),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "mt-5 h-16 rounded-xl flex items-end gap-1 px-3 pb-2",
                        style: { background: `${project.accentColor}10`, border: `1px solid ${project.accentColor}20` },
                        children: project.bars.map((h, i) => /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "flex-1 rounded-sm",
                            style: { height: `${h}%`, background: `${project.accentColor}60` }
                          },
                          i
                        ))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      style: { background: `${project.accentColor}15`, backdropFilter: "blur(4px)" },
                      children: /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-foreground",
                          style: { background: project.accentColor },
                          children: [
                            t("projects.cta"),
                            /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })
                          ]
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-widest mb-1 block", style: { color: project.accentColor }, children: t(project.categoryKey) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground", children: t(project.nameKey) })
                ] }),
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0 mt-1" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: t(project.descKey) }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tags.map((tag) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-xs font-medium px-2.5 py-1 rounded-md",
                  style: {
                    background: `${project.accentColor}15`,
                    color: project.accentColor,
                    border: `1px solid ${project.accentColor}25`
                  },
                  children: tag
                },
                tag
              )) })
            ] })
          ]
        },
        project.nameKey
      )) })
    ] })
  ] });
}
function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxs("section", { id: "contact", className: "py-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]",
        style: {
          background: "radial-gradient(ellipse, hsl(217 91% 60% / 0.1) 0%, transparent 70%)",
          filter: "blur(60px)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20", children: t("contact.badge") }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight", children: [
          t("contact.title"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "gradient-primary-text", children: t("contact.title.highlight") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: t("contact.subtitle") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "lg:col-span-3 glass rounded-2xl p-8",
            style: { boxShadow: "0 0 60px hsl(217 91% 60% / 0.08), 0 0 0 1px hsl(217 91% 60% / 0.12)" },
            children: submitted ? /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center py-12", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5",
                  style: { boxShadow: "0 0 40px hsl(217 91% 60% / 0.4)" },
                  children: /* @__PURE__ */ jsx(Send, { className: "w-7 h-7 text-aero-dark" })
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: t("contact.success.title") }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: t("contact.success.subtitle") })
            ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: t("contact.form.name.label") }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    required: true,
                    placeholder: t("contact.form.name.placeholder"),
                    value: form.name,
                    onChange: (e) => setForm({ ...form, name: e.target.value }),
                    className: "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-aero-blue/40 focus:border-aero-blue/40 transition-all duration-200"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: t("contact.form.email.label") }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    required: true,
                    placeholder: t("contact.form.email.placeholder"),
                    value: form.email,
                    onChange: (e) => setForm({ ...form, email: e.target.value }),
                    className: "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-aero-blue/40 focus:border-aero-blue/40 transition-all duration-200"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: t("contact.form.project.label") }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    required: true,
                    rows: 5,
                    placeholder: t("contact.form.project.placeholder"),
                    value: form.project,
                    onChange: (e) => setForm({ ...form, project: e.target.value }),
                    className: "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-aero-blue/40 focus:border-aero-blue/40 transition-all duration-200 resize-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "submit",
                  className: "w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-primary text-aero-dark hover:opacity-90 hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2",
                  style: { boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" },
                  children: [
                    t("contact.form.submit"),
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:aero1code@gmail.com",
              className: "glass rounded-2xl p-6 flex items-center gap-4 hover:border-aero-blue/30 transition-all duration-300 hover:-translate-y-0.5 group",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                    style: { background: "hsl(217 91% 60% / 0.15)", border: "1px solid hsl(217 91% 60% / 0.3)" },
                    children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-aero-blue" })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-0.5 font-medium", children: t("contact.email.label") }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-foreground group-hover:text-aero-blue transition-colors", children: "aero1code@gmail.com" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://wa.me/201105487365",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "glass rounded-2xl p-6 flex items-center gap-4 hover:border-aero-cyan/30 transition-all duration-300 hover:-translate-y-0.5 group",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                    style: { background: "hsl(160 84% 45% / 0.15)", border: "1px solid hsl(160 84% 45% / 0.3)" },
                    children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5", style: { color: "hsl(160 84% 45%)" } })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-0.5 font-medium", children: t("contact.whatsapp.label") }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-foreground group-hover:text-aero-cyan transition-colors", children: "+20 110 548 7365" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                style: { background: "hsl(250 80% 65% / 0.15)", border: "1px solid hsl(250 80% 65% / 0.3)" },
                children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5", style: { color: "hsl(250 80% 65%)" } })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-0.5 font-medium", children: t("contact.location.label") }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-foreground", children: "Cairo, Egypt" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-2 font-medium", children: t("contact.response.label") }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold gradient-primary-text mb-1", children: t("contact.response.value") }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: t("contact.response.description") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider", children: t("contact.social.label") }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://x.com/aeroteam_eg",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "X / Twitter",
                className: "w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-aero-blue hover:border-aero-blue/40 transition-all duration-200",
                style: { background: "hsl(220 40% 100% / 0.05)", border: "1px solid hsl(210 40% 100% / 0.08)" },
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
              }
            ) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const socials = [
  {
    label: "X / Twitter",
    href: "https://x.com/aeroteam_eg",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aero-team-4b5712377",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) })
  },
  {
    label: "GitHub",
    href: "https://github.com/Aero-official-acc",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" }) })
  }
];
function Footer() {
  const { t } = useTranslation();
  const quickLinks = [
    { label: t("footer.links.home"), href: "#" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.whyAero"), href: "#why-aero" },
    { label: t("nav.contact"), href: "#contact" }
  ];
  const serviceLinks = [
    { label: t("services.design.title"), href: "#services" },
    { label: t("services.webDev.title"), href: "#services" },
    { label: t("footer.services.seo"), href: "#services" }
  ];
  const legalLinks = [
    { label: t("footer.legal.privacy"), href: "#" },
    { label: t("footer.legal.terms"), href: "#" },
    { label: t("footer.legal.cookies"), href: "#" }
  ];
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-border bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 py-14", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-2 group w-fit", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg group-hover:opacity-90 transition-opacity", children: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-aero-dark", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxs("span", { className: "text-base font-bold text-foreground tracking-tight", children: [
            "Aero ",
            /* @__PURE__ */ jsx("span", { className: "gradient-primary-text", children: "Team" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-[220px]", children: t("footer.tagline") }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: socials.map((s) => /* @__PURE__ */ jsx(
          "a",
          {
            href: s.href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": s.label,
            className: "w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-aero-blue transition-all duration-200",
            style: {
              background: "hsl(217 91% 60% / 0.07)",
              border: "1px solid hsl(217 91% 60% / 0.15)"
            },
            children: s.icon
          },
          s.label
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-foreground mb-5 tracking-wide", children: t("footer.quickLinks") }),
        /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-3", children: quickLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "text-sm text-muted-foreground hover:text-aero-blue transition-colors duration-200",
            children: link.label
          }
        ) }, link.label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-foreground mb-5 tracking-wide", children: t("footer.services") }),
        /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-3", children: serviceLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "text-sm text-muted-foreground hover:text-aero-blue transition-colors duration-200",
            children: link.label
          }
        ) }, link.label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-foreground mb-5 tracking-wide", children: t("footer.legal.title") }),
        /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-3", children: legalLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "text-sm text-muted-foreground hover:text-aero-blue transition-colors duration-200",
            children: link.label
          }
        ) }, link.label)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: t("footer.copyright", { year: (/* @__PURE__ */ new Date()).getFullYear() }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
        t("footer.madeWith"),
        /* @__PURE__ */ jsx(Heart, { className: "w-3 h-3 fill-red-500 text-red-500" }),
        t("footer.byAero")
      ] })
    ] }) })
  ] });
}
const Index = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(ServicesSection, {}),
      /* @__PURE__ */ jsx(ProjectsSection, {}),
      /* @__PURE__ */ jsx(WhyChooseSection, {}),
      /* @__PURE__ */ jsx(ContactSection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
function LegalSection({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-foreground mb-3 pb-2 border-b border-border", children: title }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground leading-relaxed space-y-2", children })
  ] });
}
function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "pt-32 pb-14 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-0",
          "aria-hidden": "true",
          style: {
            background: "radial-gradient(ellipse at top, hsl(217 91% 60% / 0.08) 0%, transparent 60%)"
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 text-center relative z-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto mb-3", children: subtitle }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Last updated: ",
          lastUpdated
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 pb-24 max-w-3xl", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "glass rounded-2xl p-8 sm:p-12 space-y-10",
        style: {
          boxShadow: "0 0 60px hsl(217 91% 60% / 0.06), 0 0 0 1px hsl(217 91% 60% / 0.10)"
        },
        children
      }
    ) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Privacy() {
  return /* @__PURE__ */ jsxs(
    LegalLayout,
    {
      title: "Privacy Policy",
      subtitle: "How we collect, use, and protect your personal information.",
      lastUpdated: "June 2026",
      children: [
        /* @__PURE__ */ jsxs(LegalSection, { title: "1. Information We Collect", children: [
          /* @__PURE__ */ jsx("p", { children: "We collect information you provide directly when you use our contact form — including your name, email address, and project description. We do not collect payment data or require account registration." }),
          /* @__PURE__ */ jsx("p", { children: "We also collect limited technical data automatically (IP address, browser type, pages visited) through standard server logs to help us understand how the site is used." })
        ] }),
        /* @__PURE__ */ jsxs(LegalSection, { title: "2. How We Use Your Information", children: [
          /* @__PURE__ */ jsx("p", { children: "We use the information we collect to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-1 pl-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Respond to your inquiries and project requests." }),
            /* @__PURE__ */ jsx("li", { children: "Improve the performance and content of our website." }),
            /* @__PURE__ */ jsx("li", { children: "Communicate with you about our services (with your consent)." }),
            /* @__PURE__ */ jsx("li", { children: "Comply with legal obligations." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "We never sell, rent, or share your personal data with third parties for marketing purposes." })
        ] }),
        /* @__PURE__ */ jsxs(LegalSection, { title: "3. Cookies and Tracking", children: [
          /* @__PURE__ */ jsx("p", { children: "We use essential cookies to remember your preferences (such as theme and language selection). We may use analytics cookies (e.g. Google Analytics) to measure traffic. You can manage or disable cookies through your browser settings." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "See our ",
            /* @__PURE__ */ jsx("a", { href: "/cookies", className: "text-aero-blue hover:underline", children: "Cookie Policy" }),
            " for full details."
          ] })
        ] }),
        /* @__PURE__ */ jsx(LegalSection, { title: "4. Data Security", children: /* @__PURE__ */ jsx("p", { children: "We take reasonable technical and organizational measures to protect your information. All data is transmitted over HTTPS. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "5. Data Retention", children: /* @__PURE__ */ jsx("p", { children: "We retain contact form submissions only as long as necessary to respond to your inquiry, typically no longer than 12 months. Technical log data is retained for up to 90 days." }) }),
        /* @__PURE__ */ jsxs(LegalSection, { title: "6. Your Rights", children: [
          /* @__PURE__ */ jsx("p", { children: "You have the right to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-1 pl-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Access the personal data we hold about you." }),
            /* @__PURE__ */ jsx("li", { children: "Request correction or deletion of your data." }),
            /* @__PURE__ */ jsx("li", { children: "Object to or restrict processing of your data." }),
            /* @__PURE__ */ jsx("li", { children: "Withdraw consent at any time." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "To exercise any of these rights, contact us at the address below." })
        ] }),
        /* @__PURE__ */ jsx(LegalSection, { title: "7. Third-Party Services", children: /* @__PURE__ */ jsx("p", { children: "Our website may link to third-party services (e.g. Vercel for hosting, Google Fonts). These services have their own privacy policies and we are not responsible for their practices." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "8. Changes to This Policy", children: /* @__PURE__ */ jsx("p", { children: 'We may update this Privacy Policy from time to time. The "last updated" date at the top of this page reflects the latest revision. We encourage you to review this page periodically.' }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "9. Contact Us", children: /* @__PURE__ */ jsxs("p", { children: [
          "If you have any questions about this Privacy Policy, please contact us at:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:aero1code@gmail.com",
              className: "text-aero-blue hover:underline",
              children: "aero1code@gmail.com"
            }
          )
        ] }) })
      ]
    }
  );
}
function Terms() {
  return /* @__PURE__ */ jsxs(
    LegalLayout,
    {
      title: "Terms of Service",
      subtitle: "Please read these terms carefully before using our services.",
      lastUpdated: "June 2026",
      children: [
        /* @__PURE__ */ jsx(LegalSection, { title: "1. Acceptance of Terms", children: /* @__PURE__ */ jsx("p", { children: "By accessing or using the Aero Team website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "2. Services Description", children: /* @__PURE__ */ jsx("p", { children: "Aero Team provides web development, UI/UX design, SaaS development, and related digital services to clients. The specific scope, timeline, and deliverables of any project are defined in a separate project agreement between Aero Team and the client." }) }),
        /* @__PURE__ */ jsxs(LegalSection, { title: "3. User Responsibilities", children: [
          /* @__PURE__ */ jsx("p", { children: "When using our website or services, you agree to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-1 pl-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Provide accurate and complete information." }),
            /* @__PURE__ */ jsx("li", { children: "Not use the site for any unlawful or fraudulent purposes." }),
            /* @__PURE__ */ jsx("li", { children: "Not attempt to gain unauthorized access to any part of our systems." }),
            /* @__PURE__ */ jsx("li", { children: "Not transmit harmful, offensive, or disruptive content." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(LegalSection, { title: "4. Intellectual Property", children: [
          /* @__PURE__ */ jsx("p", { children: "All content on this website — including text, graphics, logos, code, and design — is the property of Aero Team and is protected by applicable intellectual property laws." }),
          /* @__PURE__ */ jsx("p", { children: "Work delivered to clients under a project agreement is subject to the ownership terms specified in that agreement. Unless otherwise agreed in writing, Aero Team retains the right to display completed work in our portfolio." })
        ] }),
        /* @__PURE__ */ jsx(LegalSection, { title: "5. Payment and Refunds", children: /* @__PURE__ */ jsx("p", { children: "Payment terms are defined in individual project agreements. Unless otherwise specified, we require a deposit before work begins. Refunds are handled on a case-by-case basis and subject to the work completed at the time of cancellation." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "6. Limitation of Liability", children: /* @__PURE__ */ jsx("p", { children: "To the maximum extent permitted by law, Aero Team shall not be liable for any indirect, incidental, or consequential damages arising out of your use of this website or our services. Our total liability shall not exceed the amount paid for the specific service in question." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "7. Disclaimers", children: /* @__PURE__ */ jsx("p", { children: 'This website is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the site will be uninterrupted, error-free, or free from viruses.' }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "8. Termination", children: /* @__PURE__ */ jsx("p", { children: "We reserve the right to terminate or restrict access to our services at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "9. Governing Law", children: /* @__PURE__ */ jsx("p", { children: "These terms are governed by and construed in accordance with the laws of Egypt. Any disputes shall be subject to the exclusive jurisdiction of the courts of Cairo, Egypt." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "10. Changes to These Terms", children: /* @__PURE__ */ jsx("p", { children: "We may update these Terms of Service at any time. Continued use of our website after changes constitutes acceptance of the revised terms." }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "11. Contact Us", children: /* @__PURE__ */ jsxs("p", { children: [
          "For questions about these Terms, contact us at:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:aero1code@gmail.com",
              className: "text-aero-blue hover:underline",
              children: "aero1code@gmail.com"
            }
          )
        ] }) })
      ]
    }
  );
}
function Cookies() {
  return /* @__PURE__ */ jsxs(
    LegalLayout,
    {
      title: "Cookie Policy",
      subtitle: "How we use cookies and similar technologies on our website.",
      lastUpdated: "June 2026",
      children: [
        /* @__PURE__ */ jsx(LegalSection, { title: "1. What Are Cookies", children: /* @__PURE__ */ jsx("p", { children: "Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences and improve your experience. Cookies cannot run programs or deliver viruses to your device." }) }),
        /* @__PURE__ */ jsxs(LegalSection, { title: "2. How We Use Cookies", children: [
          /* @__PURE__ */ jsx("p", { children: "We use cookies to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-1 pl-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Remember your theme preference (dark / light mode)." }),
            /* @__PURE__ */ jsx("li", { children: "Remember your language preference (English / Arabic)." }),
            /* @__PURE__ */ jsx("li", { children: "Analyse site traffic and user behaviour to improve our content." }),
            /* @__PURE__ */ jsx("li", { children: "Ensure the site works correctly and securely." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(LegalSection, { title: "3. Types of Cookies We Use", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground mb-1", children: "Essential Cookies" }),
            /* @__PURE__ */ jsx("p", { children: "Required for the website to function. They enable core features such as navigation and theme/language persistence. These cannot be disabled without breaking the site." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground mb-1", children: "Analytics Cookies" }),
            /* @__PURE__ */ jsx("p", { children: "Help us understand how visitors interact with the site (e.g. pages visited, time spent). We may use Google Analytics or a privacy-friendly alternative. These are set only with your consent." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground mb-1", children: "Preference Cookies" }),
            /* @__PURE__ */ jsx("p", { children: "Store your interface preferences (theme, language) so they persist between visits." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "4. Third-Party Cookies", children: /* @__PURE__ */ jsx("p", { children: "Third-party services embedded in our website (such as Google Fonts or analytics providers) may also set cookies. These are governed by the respective third party's cookie and privacy policies, over which we have no control." }) }),
        /* @__PURE__ */ jsxs(LegalSection, { title: "5. Managing Cookies", children: [
          /* @__PURE__ */ jsx("p", { children: "You can control and delete cookies through your browser settings. Most browsers allow you to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-1 pl-2", children: [
            /* @__PURE__ */ jsx("li", { children: "View the cookies stored on your device." }),
            /* @__PURE__ */ jsx("li", { children: "Delete individual cookies or all cookies." }),
            /* @__PURE__ */ jsx("li", { children: "Block cookies from specific or all websites." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Note that disabling cookies may affect the functionality of this website (e.g. theme and language preferences will not be saved)." })
        ] }),
        /* @__PURE__ */ jsx(LegalSection, { title: "6. Changes to This Policy", children: /* @__PURE__ */ jsx("p", { children: 'We may update this Cookie Policy periodically. The "last updated" date at the top of this page reflects the latest revision. Please check back from time to time.' }) }),
        /* @__PURE__ */ jsx(LegalSection, { title: "7. Contact Us", children: /* @__PURE__ */ jsxs("p", { children: [
          "If you have questions about our use of cookies, please contact us at:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:aero1code@gmail.com",
              className: "text-aero-blue hover:underline",
              children: "aero1code@gmail.com"
            }
          )
        ] }) })
      ]
    }
  );
}
const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-md", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg",
        style: { boxShadow: "0 0 40px hsl(217 91% 60% / 0.35)" },
        children: /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 text-aero-dark", strokeWidth: 2.5 })
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-black gradient-primary-text mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-foreground mb-2", children: t("notFound.title") }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "The page you are looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/",
        className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-primary text-aero-dark hover:opacity-90 transition-opacity",
        style: { boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" },
        children: t("notFound.actions.backHome")
      }
    )
  ] }) });
};
const App = () => /* @__PURE__ */ jsxs(Routes, { children: [
  /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(Terms, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/cookies", element: /* @__PURE__ */ jsx(Cookies, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
] });
function render(url) {
  return renderToString(
    createElement(StaticRouter, { location: url }, createElement(App))
  );
}
export {
  render
};
