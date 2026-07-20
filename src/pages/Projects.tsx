import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SmoothScroll from "@/components/ui/smoothscroll";
import Seo from "@/components/Seo";
import projectsData from "@/data/projects.json";


type MockProject = {
  id: string;
  nameKey: string;
  categoryKey: string;
  descKey: string;
  tags: string[];
  features: string[];
  techUsed?: string[];
  accentColor: string;
  imageUrl: string;
};

const mockProjects: MockProject[] = projectsData as MockProject[];

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<MockProject | null>(null);

  const defaultTechUsed = ["React", "TypeScript", "Tailwind CSS"];

  const projectsSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: t("projectsPage.title"),
      url: "https://aeroteam.vercel.app/projects",
      description: t("projectsPage.subtitle"),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${t("projectsPage.title")} | ${t("common.appName")}`}
        description={t("projectsPage.subtitle")}
        canonical="https://aeroteam.vercel.app/projects"
        jsonLd={projectsSchema}
      />
      <Navbar />
      <SmoothScroll />
      <main className="pt-24 pb-24">
        <section className="animate-section-entry container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-aero-cyan transition hover:translate-x-[-2px]"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("projectsPage.back")}
              </Link>
              <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {t("projectsPage.title")}
              </h1>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockProjects.map((project, index) => (
              <article
                key={project.id}
                className="glass rounded-2xl border border-transparent p-5 transition duration-300 hover:-translate-y-1 group project-hover-border"
                style={{ "--hover-border-color": project.accentColor } as React.CSSProperties}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentColor}22 0%, rgba(15,17,23,0.95) 100%)`,
                  }}
                >
                  <img
                    src={project.imageUrl}
                    alt={t(project.nameKey)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
                  >
                    <span
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: project.accentColor,
                        color: "#fff",
                        boxShadow: `0 10px 30px ${project.accentColor}40`,
                      }}
                    >
                      See More
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>

                <div className="mt-5">
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.28em]"
                    style={{ color: project.accentColor }}
                  >
                    {t(project.categoryKey)}
                  </span>
                  <h2 className="mt-2 text-xl font-semibold text-foreground">
                    {t(project.nameKey)}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(project.descKey)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {activeProject && (
          <div className="animate-in fade-in duration-200 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm px-4 py-6 sm:p-8">
            <div
              className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 relative mx-auto flex h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${activeProject.accentColor}26 0%, hsl(var(--background)) 48%)`,
              }}
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/90 text-white transition hover:bg-slate-900"
                aria-label="Close project details"
              >
                ×
              </button>

              <div className="grid w-full grid-cols-1 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
                <div className="animate-in fade-in slide-in-from-left-12 duration-500 relative overflow-hidden bg-slate-950/90 p-8 text-white sm:p-10">
                  <div className="relative z-10 flex h-full flex-col gap-8">
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                        {t(activeProject.categoryKey)}
                      </p>
                      <h2 className="text-3xl font-bold tracking-tight text-white">
                        {t(activeProject.nameKey)}
                      </h2>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                        Features
                      </h3>
                      <ul className="space-y-3 text-sm leading-relaxed text-slate-200">
                        {activeProject.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                        Tech used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(activeProject.techUsed ?? defaultTechUsed).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="animate-in fade-in slide-in-from-right-12 duration-500 flex flex-col overflow-hidden bg-slate-900/90 p-6 text-slate-100 sm:p-10">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                    <img
                      src={activeProject.imageUrl}
                      alt={t(activeProject.nameKey)}
                      className="h-[320px] w-full object-cover sm:h-[360px]"
                    />
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                        Overview
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {t(activeProject.descKey)}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
