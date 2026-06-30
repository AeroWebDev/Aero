import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type ProjectMeta = {
  nameKey: string;
  categoryKey: string;
  descKey: string;
  tags: string[];
  accentColor: string;
  link?: string;
  isInteractive?: boolean;
} & (
  | {
      image: string;
      mockupStyle?: never;
      mockupLines?: never;
      bars?: never;
    }
  | {
      image?: never;
      mockupStyle: React.CSSProperties;
      mockupLines: { w: string; c: string }[];
      bars: number[];
    }
);

const projectsMeta: ProjectMeta[] = [
  {
    nameKey: "projects.saasLanding.name",
    categoryKey: "projects.saasLanding.category",
    descKey: "projects.saasLanding.description",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    accentColor: "hsl(85 90% 55%)",
    image: "/projects/saas-landing-page.jpg",
    isInteractive: false,
  },
  {
    nameKey: "projects.storex.name",
    categoryKey: "projects.storex.category",
    descKey: "projects.storex.description",
    tags: ["React", "Chart.js", "TypeScript"],
    accentColor: "hsl(262 70% 65%)",
    image: "/projects/storex-admin-dashboard.png",
    isInteractive: false,
  },
  {
    nameKey: "projects.aeroShop.name",
    categoryKey: "projects.aeroShop.category",
    descKey: "projects.aeroShop.description",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    accentColor: "hsl(55 100% 55%)",
    image: "/projects/aero-shop.png",
    isInteractive: false,
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
      { w: "80%", c: "hsl(250 80% 65% / 0.4)" },
    ],
    bars: [70, 50, 85, 40, 65, 90, 55],
    isInteractive: true,
  },
];

export default function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, hsl(217 91% 60% / 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20">
            {t("projects.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t("projects.title")}{" "}
            <span className="gradient-primary-text">{t("projects.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectsMeta.map((project) => {
            const CardTag = project.isInteractive ? "a" : "div";
            return (
              <CardTag
                key={project.nameKey}
                {...(project.isInteractive
                  ? {
                      href: "#contact",
                      className:
                        "group glass rounded-2xl overflow-hidden hover:border-aero-blue/25 transition-all duration-300 hover:-translate-y-1 block no-underline cursor-pointer",
                    }
                  : {
                      className:
                        "glass rounded-2xl overflow-hidden block",
                    })}
              >
                {/* Visual area — real screenshot or generated mockup */}
                <div className="relative h-52 sm:h-60 w-full overflow-hidden">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={t(project.nameKey)}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={project.mockupStyle}
                    >
                      <div className="w-4/5 max-w-xs space-y-3 px-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: project.accentColor, opacity: 0.8 }} />
                          <div className="h-2 rounded-full flex-1" style={{ background: `${project.accentColor}30` }} />
                        </div>
                        {project.mockupLines.map((line, i) => (
                          <div key={i} className="h-2.5 rounded-full" style={{ width: line.w, background: line.c }} />
                        ))}
                        <div
                          className="mt-5 h-16 rounded-xl flex items-end gap-1 px-3 pb-2"
                          style={{ background: `${project.accentColor}10`, border: `1px solid ${project.accentColor}20` }}
                        >
                          {project.bars.map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{ height: `${h}%`, background: `${project.accentColor}60` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Hover overlay — CTA visually indicates action; card itself is the link */}
                      {project.isInteractive && (
                        <div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `${project.accentColor}15`, backdropFilter: "blur(4px)" }}
                        >
                          <div
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-foreground"
                            style={{ background: project.accentColor }}
                          >
                            {t("projects.cta")}
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest mb-1 block" style={{ color: project.accentColor }}>
                        {t(project.categoryKey)}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">{t(project.nameKey)}</h3>
                    </div>
                    {project.isInteractive && (
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {t(project.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-md"
                        style={{
                          background: `${project.accentColor}15`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
