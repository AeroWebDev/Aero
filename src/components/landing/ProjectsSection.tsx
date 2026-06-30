import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

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
      { w: "45%", c: "hsl(217 91% 60% / 0.4)" },
    ],
    bars: [40, 70, 50, 90, 65, 80, 55],
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
      { w: "85%", c: "hsl(32 95% 60% / 0.4)" },
    ],
    bars: [60, 45, 80, 55, 75, 40, 90],
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
      { w: "50%", c: "hsl(160 84% 45% / 0.4)" },
    ],
    bars: [55, 80, 60, 70, 45, 85, 65],
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
          {projectsMeta.map((project) => (
            <a
              key={project.nameKey}
              href="#contact"
              className="group glass rounded-2xl overflow-hidden hover:border-aero-blue/25 transition-all duration-300 hover:-translate-y-1 block no-underline"
            >
              {/* Mockup visual area */}
              <div
                className="relative h-52 sm:h-60 w-full flex items-center justify-center overflow-hidden"
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
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0 mt-1" />
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
