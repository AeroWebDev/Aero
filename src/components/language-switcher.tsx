import { useTranslation } from "react-i18next";

import { fallbackLng, languageOptions, normalizeLanguage } from "@/i18n/config";

type LanguageSwitcherProps = {
  className?: string;
};

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const currentLanguage =
    normalizeLanguage(i18n.resolvedLanguage ?? i18n.language) ?? fallbackLng;

  return (
    <select
      value={currentLanguage}
      onChange={(event) => {
        void i18n.changeLanguage(event.target.value);
      }}
      className={`min-w-[140px] rounded-lg border px-3 py-2 ${className ?? ""}`}
      aria-label="Select language"
    >
      {languageOptions.map((language) => (
        <option key={language.value} value={language.value}>
          {language.label}
        </option>
      ))}
    </select>
  );
};
