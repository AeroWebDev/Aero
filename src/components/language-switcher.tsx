import { useTranslation } from "react-i18next";
import { fallbackLng, normalizeLanguage } from "@/i18n/config";

type LanguageSwitcherProps = {
  className?: string;
};

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const currentLanguage =
    normalizeLanguage(i18n.resolvedLanguage ?? i18n.language) ?? fallbackLng;
  const isArabic = currentLanguage === "ar";

  const handleToggle = () => {
    void i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <button
      onClick={handleToggle}
      className={`rounded-lg glass border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${className ?? ""}`}
      aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
    >
      {isArabic ? "English" : "عربي"}
    </button>
  );
};
