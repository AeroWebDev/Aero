import { useState, useEffect } from "react";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTheme } from "@/hooks/use-theme";

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const navLinks = [
    { label: t("nav.services"), href: "/#services", id: "services" },
    { label: t("nav.projects"), href: "/#projects", id: "projects" },
    { label: t("nav.whyAero"), href: "/#why-aero", id: "why-aero" },
    { label: t("nav.contact"), href: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["services", "projects", "why-aero", "contact"];
    const observers: IntersectionObserver[] = [];

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-border py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 drop-shadow-lg">
            <img src="/logo.png" alt="Aero Logo" className="w-full h-full object-contain scale-[1.15]" />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 border-b-2 pb-0.5 ${
                activeSection === link.id
                  ? "text-foreground border-aero-blue"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: theme toggle + language switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <LanguageSwitcher className="h-9 text-sm bg-secondary border-border text-foreground" />
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-primary text-white hover:opacity-90 transition-opacity duration-200 shadow-lg"
          >
            {t("nav.cta")}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-nav-menu" className="md:hidden glass-strong border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors border-b pb-2 ${
                activeSection === link.id
                  ? "text-foreground border-aero-blue"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher className="bg-secondary border-border text-foreground" />
          
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-primary text-white text-center"
          >
            {t("nav.cta")}
          </a>
        </div>
      )}
    </header>
  );
}
