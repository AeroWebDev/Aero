import { ArrowLeft, ArrowUpRight, X, ExternalLink, Check, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SmoothScroll, { stopScroll, startScroll } from "@/components/ui/smoothscroll";
import Seo from "@/components/Seo";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";

const projects: Project[] = projectsData as Project[];

/* ─── Modal ────────────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  /* Lock body scroll completely while modal is open */
  useEffect(() => {
    stopScroll();
    const id = requestAnimationFrame(() => setMounted(true));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", handleKeyDown);
      startScroll();
    };
  }, []);

  const close = () => {
    setMounted(false);
    setTimeout(onClose, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close();
  };

  const accent = project.accentColor;

  return createPortal(
    /* ── Viewport Backdrop (Pinned to absolute screen center) ── */
    <div
      ref={overlayRef}
      data-lenis-prevent
      onClick={handleOverlayClick}
      onWheel={(e) => {
        if (e.target === overlayRef.current) e.preventDefault();
      }}
      onTouchMove={(e) => {
        if (e.target === overlayRef.current) e.preventDefault();
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: mounted ? "rgba(0, 0, 0, 0.88)" : "rgba(0, 0, 0, 0)",
        backdropFilter: mounted ? "blur(20px)" : "blur(0px)",
        WebkitBackdropFilter: mounted ? "blur(20px)" : "blur(0px)",
        transition:
          "background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* ── Dialog Panel (Dead Center, Near-Black with Project Accent) ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(project.nameKey)}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[86vh] rounded-3xl flex flex-col overflow-hidden my-auto shadow-2xl"
        style={{
          background: `linear-gradient(165deg,
            color-mix(in srgb, ${accent} 10%, #060608) 0%,
            #030304 55%,
            color-mix(in srgb, ${accent} 6%, #020203) 100%)`,
          border: `1px solid color-mix(in srgb, ${accent} 38%, rgba(255, 255, 255, 0.08))`,
          boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.02),
                      0 30px 100px rgba(0, 0, 0, 0.95),
                      0 0 65px color-mix(in srgb, ${accent} 22%, transparent)`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1) translateY(0)" : "scale(0.92) translateY(18px)",
          transition:
            "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Subtle top accent highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent} 40%, ${accent} 60%, transparent)`,
            opacity: 0.7,
          }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "rgba(255, 255, 255, 0.75)",
          }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Scrollable Inner Content ── */}
        <div
          data-lenis-prevent
          className="overflow-y-auto flex-1 overscroll-contain"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Hero image strip */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16/7", maxHeight: "300px" }}
          >
            <img
              src={project.imageUrl}
              alt={t(project.nameKey)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* dark gradient veil */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom,
                  rgba(3, 3, 4, 0) 0%,
                  rgba(3, 3, 4, 0.6) 65%,
                  #030304 100%)`,
              }}
            />
            {/* accent ambient glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 85% 50%, ${accent}, transparent 65%)`,
              }}
            />
            {/* Category tag on image */}
            <div className="absolute bottom-4 left-6">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.3em] px-3.5 py-1.5 rounded-full"
                style={{
                  background: `color-mix(in srgb, ${accent} 18%, rgba(0, 0, 0, 0.7))`,
                  color: accent,
                  border: `1px solid color-mix(in srgb, ${accent} 42%, transparent)`,
                }}
              >
                {t(project.categoryKey)}
              </span>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px]">
            {/* Left section: Info & Features */}
            <div className="p-6 sm:p-8 flex flex-col gap-7">
              {/* Title & Visit Link */}
              <div className="flex items-start justify-between gap-4 pr-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    {t(project.nameKey)}
                  </h2>
                  <p className="text-sm text-white/55 leading-relaxed max-w-[52ch]">
                    {t(project.descKey)}
                  </p>
                </div>

                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:brightness-110"
                    style={{
                      background: accent,
                      color: "#fff",
                      boxShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)`,
                    }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit Site
                  </a>
                )}
              </div>

              {/* Features list */}
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2"
                  style={{ color: accent }}
                >
                  <Layers className="w-3.5 h-3.5" />
                  {t("projectsPage.modal.features")}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
                  {project.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-white/75 leading-relaxed"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div
                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: `color-mix(in srgb, ${accent} 15%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
                        }}
                      >
                        <Check className="w-3 h-3" style={{ color: accent }} strokeWidth={2.5} />
                      </div>
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.3em] mb-3"
                  style={{ color: "rgba(255, 255, 255, 0.35)" }}
                >
                  {t("projectsPage.modal.tags")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        color: accent,
                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                      }}
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Visit Button */}
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: accent,
                    color: "#fff",
                    boxShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)`,
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </a>
              )}
            </div>

            {/* Right section: Tech Used sidebar */}
            <div
              className="lg:border-l p-6 sm:p-8 flex flex-col gap-3.5"
              style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <h3
                className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
                style={{ color: accent }}
              >
                {t("projectsPage.modal.techUsed")}
              </h3>

              {(project.techUsed ?? ["React", "TypeScript", "Tailwind CSS"]).map((tech, i) => (
                <div
                  key={tech}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/80"
                  style={{
                    background: `color-mix(in srgb, ${accent} 6%, #070709)`,
                    border: `1px solid color-mix(in srgb, ${accent} 16%, rgba(255, 255, 255, 0.06))`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: accent,
                      boxShadow: `0 0 6px ${accent}`,
                      opacity: Math.max(0.45, 1 - i * 0.08),
                    }}
                  />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── Projects Page ─────────────────────────────────────── */

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
    <div className="min-h-screen bg-background text-foreground page-transition">
      <Seo
        title={`${t("projectsPage.title")}`}
        description={t("projectsPage.subtitle")}
        canonical="https://aeroteam.vercel.app/projects"
        jsonLd={projectsSchema}
      />
      <Navbar />
      <SmoothScroll />

      <main className="pt-28 pb-24">
        <section className="container mx-auto px-6">
          {/* Page header */}
          <div className="mb-14">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-aero-cyan transition-all duration-200 hover:-translate-x-1 mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {t("projectsPage.back")}
            </Link>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-3">
              {t("projectsPage.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              {t("projectsPage.subtitle")}
            </p>
          </div>

          {/* Grid of Projects */}
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpen={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal directly mounted to body via portal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}

/* ─── Project Card (Near-Black with Project Accent) ─────── */

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const accent = project.accentColor;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      className="group relative rounded-2xl overflow-hidden border flex flex-col cursor-pointer"
      style={{
        /* Pure near-black tinted with the project's own accent color */
        background: hovered
          ? `linear-gradient(145deg,
              color-mix(in srgb, ${accent} 9%, #060608) 0%,
              #040406 100%)`
          : `linear-gradient(145deg,
              color-mix(in srgb, ${accent} 4%, #050507) 0%,
              #030304 100%)`,
        borderColor: hovered
          ? `color-mix(in srgb, ${accent} 48%, transparent)`
          : `color-mix(in srgb, ${accent} 12%, rgba(255, 255, 255, 0.06))`,
        boxShadow: hovered
          ? `0 0 0 1px color-mix(in srgb, ${accent} 20%, transparent),
             0 20px 50px color-mix(in srgb, ${accent} 12%, transparent)`
          : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={project.imageUrl}
          alt={t(project.nameKey)}
          loading={index < 3 ? "eager" : "lazy"}
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />

        {/* Dark veil over image */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to bottom, transparent 25%, rgba(4, 4, 6, 0.75) 100%)",
            opacity: hovered ? 0.6 : 0.85,
          }}
        />

        {/* Ambient accent radial glow on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at top right, color-mix(in srgb, ${accent} 22%, transparent), transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Hover Pill button */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            backdropFilter: hovered ? "blur(3px)" : "blur(0px)",
          }}
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{
              background: accent,
              color: "#fff",
              boxShadow: `0 8px 30px color-mix(in srgb, ${accent} 50%, transparent)`,
              transform: hovered ? "scale(1)" : "scale(0.85)",
              transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {t("projectsPage.modal.seeMore")}
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Info details */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.28em]"
          style={{ color: accent }}
        >
          {t(project.categoryKey)}
        </span>

        <h2 className="text-lg font-bold text-foreground leading-snug">
          {t(project.nameKey)}
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {t(project.descKey)}
        </p>

        {/* Bottom tags & link badge */}
        <div
          className="flex items-center justify-between gap-2 pt-2 border-t"
          style={{ borderColor: `color-mix(in srgb, ${accent} 12%, rgba(255, 255, 255, 0.05))` }}
        >
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{
                  color: accent,
                  background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
                }}
              >
                {t(tag)}
              </span>
            ))}
          </div>

          {project.link && project.link !== "#" && (
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accent} 28%, transparent)`,
                color: accent,
              }}
              title="Has live site"
            >
              <ExternalLink className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
