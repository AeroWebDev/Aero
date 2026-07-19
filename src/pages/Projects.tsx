import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

type MockProject = {
  id: string;
  nameKey: string;
  categoryKey: string;
  descKey: string;
  tags: string[];
  accentColor: string;
};

const mockProjects: MockProject[] = [
  {
    id: "finflow",
    nameKey: "projectsPage.items.finflow.name",
    categoryKey: "projectsPage.items.finflow.category",
    descKey: "projectsPage.items.finflow.description",
    tags: ["Fintech", "Dashboard", "SaaS"],
    accentColor: "hsl(185 80% 55%)",
  },
  {
    id: "urbanloop",
    nameKey: "projectsPage.items.urbanloop.name",
    categoryKey: "projectsPage.items.urbanloop.category",
    descKey: "projectsPage.items.urbanloop.description",
    tags: ["Mobility", "Booking", "UI/UX"],
    accentColor: "hsl(262 70% 65%)",
  },
  {
    id: "pulsecare",
    nameKey: "projectsPage.items.pulsecare.name",
    categoryKey: "projectsPage.items.pulsecare.category",
    descKey: "projectsPage.items.pulsecare.description",
    tags: ["Healthcare", "Portal", "Realtime"],
    accentColor: "hsl(8 85% 62%)",
  },
  {
    id: "voyager",
    nameKey: "projectsPage.items.voyager.name",
    categoryKey: "projectsPage.items.voyager.category",
    descKey: "projectsPage.items.voyager.description",
    tags: ["Travel", "Marketplace", "Animation"],
    accentColor: "hsl(217 91% 60%)",
  },
  {
    id: "neurofit",
    nameKey: "projectsPage.items.neurofit.name",
    categoryKey: "projectsPage.items.neurofit.category",
    descKey: "projectsPage.items.neurofit.description",
    tags: ["Wellness", "Mobile", "Gamified"],
    accentColor: "hsl(145 60% 50%)",
  },
  {
    id: "studioflow",
    nameKey: "projectsPage.items.studioflow.name",
    categoryKey: "projectsPage.items.studioflow.category",
    descKey: "projectsPage.items.studioflow.description",
    tags: ["Creative", "CMS", "Collaboration"],
    accentColor: "hsl(35 95% 60%)",
  },
  {
    id: "marketmint",
    nameKey: "projectsPage.items.marketmint.name",
    categoryKey: "projectsPage.items.marketmint.category",
    descKey: "projectsPage.items.marketmint.description",
    tags: ["Commerce", "B2B", "Analytics"],
    accentColor: "hsl(315 75% 66%)",
  },
  {
    id: "edunest",
    nameKey: "projectsPage.items.edunest.name",
    categoryKey: "projectsPage.items.edunest.category",
    descKey: "projectsPage.items.edunest.description",
    tags: ["Education", "Learning", "Community"],
    accentColor: "hsl(120 70% 50%)",
  },
  {
    id: "logiql",
    nameKey: "projectsPage.items.logiql.name",
    categoryKey: "projectsPage.items.logiql.category",
    descKey: "projectsPage.items.logiql.description",
    tags: ["Logistics", "Ops", "Automation"],
    accentColor: "hsl(260 90% 70%)",
  },
  {
    id: "aurora",
    nameKey: "projectsPage.items.aurora.name",
    categoryKey: "projectsPage.items.aurora.category",
    descKey: "projectsPage.items.aurora.description",
    tags: ["Branding", "Marketing", "Content"],
    accentColor: "hsl(20 90% 60%)",
  },
];

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <title>{`${t("projectsPage.title")} | ${t("common.appName")}`}</title>
      <meta name="description" content={t("projectsPage.subtitle")} />
      <Navbar />

      <main className="pt-24 pb-24">
        <section className="container mx-auto px-6">
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
              <p className="mt-3 text-lg text-muted-foreground">
                {t("projectsPage.subtitle")}
              </p>
            </div>

            <div className="glass rounded-2xl border border-aero-cyan/20 px-5 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-aero-cyan">
              {t("projectsPage.count")}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockProjects.map((project, index) => (
              <article
                key={project.id}
                className="glass rounded-2xl border border-border/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-aero-cyan/30"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentColor}22 0%, rgba(15,17,23,0.95) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_45%)]" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-[220px] space-y-3">
                      <div className="h-3 rounded-full bg-white/70" />
                      <div className="grid grid-cols-[1.4fr_0.6fr] gap-3">
                        <div className="h-16 rounded-xl border border-white/20 bg-white/10" />
                        <div className="h-16 rounded-xl border border-white/20 bg-white/10" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 flex-1 rounded-full bg-white/50" />
                        <div className="h-2.5 w-10 rounded-full bg-white/30" />
                      </div>
                      <div className="h-2.5 w-2/3 rounded-full bg-white/40" />
                    </div>
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
                    #{index + 1}
                  </div>
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
      </main>

      <Footer />
    </div>
  );
}
