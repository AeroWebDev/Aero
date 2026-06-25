import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ boxShadow: "0 0 40px hsl(217 91% 60% / 0.35)" }}>
          <Zap className="w-8 h-8 text-aero-dark" strokeWidth={2.5} />
        </div>
        <h1 className="text-7xl font-black gradient-primary-text mb-4">404</h1>
        <p className="text-xl font-semibold text-foreground mb-2">
          {t("notFound.title")}
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-primary text-aero-dark hover:opacity-90 transition-opacity"
          style={{ boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" }}
        >
          {t("notFound.actions.backHome")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
