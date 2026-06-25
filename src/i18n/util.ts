export const fallbackLng = "en";

export const supportedLngs = ["en", "ar"] as const;

export type SupportedLanguage = (typeof supportedLngs)[number];

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
] as const;

export const normalizeLanguage = (language?: string): SupportedLanguage | undefined => {
  const normalized = language?.split("-")[0];
  return supportedLngs.includes(normalized as SupportedLanguage)
    ? (normalized as SupportedLanguage)
    : undefined;
};

export const getLanguageDirection = (language: string) => {
  return normalizeLanguage(language) === "ar" ? "rtl" : "ltr";
};
