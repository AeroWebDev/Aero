import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  },
  {
    nameKey: "projects.storex.name",
    categoryKey: "projects.storex.category",
    descKey: "projects.storex.description",
    tags: ["React", "Chart.js", "TypeScript"],
    accentColor: "hsl(262 70% 65%)",
    image: "/projects/storex-admin-dashboard.png",
  },
  {
    nameKey: "projects.aeroShop.name",
    categoryKey: "projects.aeroShop.category",
    descKey: "projects.aeroShop.description",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    accentColor: "hsl(55 100% 55%)",
    image: "/projects/aero-shop.png",
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
  const ref = useScrollAnimation();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="projects" className="py-24 relative overflow-hidden">
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
          <div className="animate-on-scroll inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20">
            {t("projects.badge")}
          </div>
          <h2 className="animate-on-scroll anim-delay-1 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t("projects.title")}{" "}
            <span className="gradient-primary-text">{t("projects.title.highlight")}</span>
          </h2>
          <p className="animate-on-scroll anim-delay-2 text-muted-foreground text-lg max-w-xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectsMeta.map((project, index) => {
            const CardTag = "a";
            const delayClass = `anim-delay-${Math.min(index + 1, 6)}`;
            return (
              <CardTag
                key={project.nameKey}
                href={project.link ?? "#"}
                onMouseEnter={() => setHoveredProject(project.nameKey)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`animate-scale-in ${delayClass} group glass rounded-2xl overflow-hidden border transition-all duration-300 block no-underline cursor-pointer`}
                style={{
                  borderColor:
                    hoveredProject === project.nameKey
                      ? `color-mix(in srgb, ${project.accentColor} 35%, transparent)`
                      : "transparent",

                  boxShadow:
                    hoveredProject === project.nameKey
                      ? `0 8px 30px color-mix(in srgb, ${project.accentColor} 18%, transparent)`
                      : "0 0 0 transparent",
                }}
              >
                {/* Visual area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0f1117]">

                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={t(project.nameKey)}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 group-hover:opacity-20 transition-opacity duration-500" />
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={project.mockupStyle}
                    >
                      {/* الـ Mockup بتاعك */}
                    </div>
                  )}

                  {/* خلي الجزء ده هنا */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: project.accentColor,
                        color: "#fff",
                        boxShadow: `0 10px 30px ${project.accentColor}40`,
                      }}
                    >
                      See More
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest mb-1 block"
                        style={{ color: project.accentColor }}
                      >
                        {t(project.categoryKey)}
                      </span>

                      <h3 className="text-xl font-bold text-foreground">
                        {t(project.nameKey)}
                      </h3>
                    </div>

                    {project.isInteractive && (
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {t(project.descKey)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 hover:scale-105"
                        style={{
                          color: project.accentColor,
                          backgroundColor: `color-mix(in srgb, ${project.accentColor} 12%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${project.accentColor} 30%, transparent)`,
                          boxShadow: `0 0 20px color-mix(in srgb, ${project.accentColor} 15%, transparent)`,
                        }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: project.accentColor,
                          }}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardTag>
            );
          })}
        </div>
      </div >
    </section >
  );
}
