import { useState, useEffect } from "react";
import { Mail, MessageCircle, Send, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type Status = "idle" | "loading" | "success" | "error" | "rate_limited";

interface ContactSectionProps {
  prefilledService?: string;
}

export default function ContactSection({ prefilledService }: ContactSectionProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  // Honeypot field — stays empty for real users, filled by bots
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (prefilledService) {
      setForm((prev) => ({
        ...prev,
        project: t("contact.form.project.prefill", { service: prefilledService }),
      }));
    }
  }, [prefilledService, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          project: form.project,
          website, // honeypot — server silently drops if non-empty
        }),
      });

      if (res.status === 429) {
        setStatus("rate_limited");
        return;
      }

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse, hsl(217 91% 60% / 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-aero-cyan uppercase tracking-widest border border-aero-cyan/20">
            {t("contact.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t("contact.title")}{" "}
            <span className="gradient-primary-text">{t("contact.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form card */}
          <div
            className="lg:col-span-3 glass rounded-2xl p-8"
            style={{ boxShadow: "0 0 60px hsl(217 91% 60% / 0.08), 0 0 0 1px hsl(217 91% 60% / 0.12)" }}
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5"
                  style={{ boxShadow: "0 0 40px hsl(217 91% 60% / 0.4)" }}
                >
                  <Send className="w-7 h-7 text-aero-dark" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t("contact.success.title")}</h3>
                <p className="text-muted-foreground text-sm max-w-xs">{t("contact.success.subtitle")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from real users via CSS, bots fill it */}
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.name.label")}
                  </label>
                  <input
                    type="text"
                    required
                    disabled={status === "loading"}
                    placeholder={t("contact.form.name.placeholder")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-aero-blue/40 focus:border-aero-blue/40 transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.email.label")}
                  </label>
                  <input
                    type="email"
                    required
                    disabled={status === "loading"}
                    placeholder={t("contact.form.email.placeholder")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-aero-blue/40 focus:border-aero-blue/40 transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.project.label")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    disabled={status === "loading"}
                    placeholder={t("contact.form.project.placeholder")}
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-aero-blue/40 focus:border-aero-blue/40 transition-all duration-200 resize-none disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400 text-center">
                    {t("contact.error")}
                  </p>
                )}

                {status === "rate_limited" && (
                  <p className="text-sm text-amber-400 text-center">
                    {t("contact.rateLimited")}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-primary text-aero-dark hover:opacity-90 hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                  style={{ boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      {t("contact.form.submit")}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-4">
             {/* Email */}
             {/* TODO: Change email to custom domain email when domain is ready */}
             <a
              href="mailto:aero1code@gmail.com"
              className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-aero-blue/30 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(217 91% 60% / 0.15)", border: "1px solid hsl(217 91% 60% / 0.3)" }}
              >
                <Mail className="w-5 h-5 text-aero-blue" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5 font-medium">{t("contact.email.label")}</div>
                <div className="text-sm font-semibold text-foreground group-hover:text-aero-blue transition-colors">
                  aero1code@gmail.com
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/201105487365"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-aero-cyan/30 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(160 84% 45% / 0.15)", border: "1px solid hsl(160 84% 45% / 0.3)" }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: "hsl(160 84% 45%)" }} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5 font-medium">{t("contact.whatsapp.label")}</div>
                <div className="text-sm font-semibold text-foreground group-hover:text-aero-cyan transition-colors">
                  +20 110 548 7365
                </div>
              </div>
            </a>

            {/* Location */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(250 80% 65% / 0.15)", border: "1px solid hsl(250 80% 65% / 0.3)" }}
              >
                <MapPin className="w-5 h-5" style={{ color: "hsl(250 80% 65%)" }} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5 font-medium">{t("contact.location.label")}</div>
                <div className="text-sm font-semibold text-foreground">Cairo, Egypt</div>
              </div>
            </div>

            {/* Response time */}
            <div className="glass rounded-2xl p-6">
              <div className="text-xs text-muted-foreground mb-2 font-medium">{t("contact.response.label")}</div>
              <div className="text-2xl font-bold gradient-primary-text mb-1">{t("contact.response.value")}</div>
              <div className="text-sm text-muted-foreground">{t("contact.response.description")}</div>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-6">
              <div className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
                {t("contact.social.label")}
              </div>
              <div className="flex gap-3">
                <a
                  href="https://x.com/aeroteam_eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-aero-blue hover:border-aero-blue/40 transition-all duration-200"
                  style={{ background: "hsl(220 40% 100% / 0.05)", border: "1px solid hsl(210 40% 100% / 0.08)" }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}