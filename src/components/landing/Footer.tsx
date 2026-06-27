import { Zap, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const socials = [
  {
    label: "X / Twitter",
    href: "https://x.com/aeroteam_eg",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aero-team-4b5712377",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Aero-official-acc",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("footer.links.home"), href: "#" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.whyAero"), href: "#why-aero" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const serviceLinks = [
    { label: t("services.design.title"), href: "#services" },
    { label: t("services.webDev.title"), href: "#services" },
    { label: t("footer.services.seo"), href: "#services" },
  ];

  const legalLinks = [
    { label: t("footer.legal.privacy"), href: "/public/terms/privacy" },
    { label: t("footer.legal.terms"), href: "/public/terms/terms" },
    { label: t("footer.legal.cookies"), href: "/public/terms/cookies" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      {/* Main grid */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg group-hover:opacity-90 transition-opacity">
                <Zap className="w-4 h-4 text-aero-dark" strokeWidth={2.5} />
              </div>
              <span className="text-base font-bold text-foreground tracking-tight">
                Aero <span className="gradient-primary-text">Team</span>
              </span>
            </a>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              {t("footer.tagline")}
            </p>

            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-aero-blue transition-all duration-200"
                  style={{
                    background: "hsl(217 91% 60% / 0.07)",
                    border: "1px solid hsl(217 91% 60% / 0.15)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5 tracking-wide">
              {t("footer.quickLinks")}
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-aero-blue transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5 tracking-wide">
              {t("footer.services")}
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-aero-blue transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5 tracking-wide">
              {t("footer.legal.title")}
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-aero-blue transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {t("footer.madeWith")}
            <Heart className="w-3 h-3 fill-red-500 text-red-500" />
            {t("footer.byAero")}
          </p>
        </div>
      </div>
    </footer>
  );
}
