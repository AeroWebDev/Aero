import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ─── Static translation imports ────────────────────────────────────────────────
// Locale JSON is bundled directly into the JS bundle at build time instead of
// being fetched over HTTP at runtime (i18next-http-backend). This removes a
// network round-trip + async plugin-loading chain that previously delayed
// every t() call, causing raw translation keys to flash (or stick) on first
// paint. Resources are available synchronously the instant init() runs, in
// both the SSR/prerender context and the browser.
import en from "./locales/en.json";
import ar from "./locales/ar.json";

// ─── Language metadata ─────────────────────────────────────────────────────────
export const fallbackLng = "en";

// English is always the default language. We intentionally do NOT auto-detect
// the browser/OS/cookie language on load, per product decision — every first
// visit starts in English regardless of locale. Returning users who manually
// switched language still get their choice restored (see getInitialLanguage).
export const defaultLng = "en";

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

// ─── Resource bundle (shared by SSR and browser) ───────────────────────────────
const resources = {
  en: { translation: en },
  ar: { translation: ar },
} as const;

// ─── Environment guard ────────────────────────────────────────────────────────
// Browser-only persistence (localStorage) is behind this flag so the module
// stays safe to import in a Node / SSR context (prerender).
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

const STORAGE_KEY = "aero-lang";

// Synchronous — no cookie library, no async detector. A returning visitor's
// manually-chosen language (if any) is read once, before the first render,
// so the language is known up front and there is no hydration mismatch
// between server-rendered HTML and the client's first render.
function getInitialLanguage(): SupportedLanguage {
  if (!isBrowser) return defaultLng;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return normalizeLanguage(stored ?? undefined) ?? defaultLng;
  } catch {
    // localStorage can throw in some privacy modes — fall back silently.
    return defaultLng;
  }
}

// ─── Single unified init (SSR + browser) ───────────────────────────────────────
// Resources are static imports, so the same init() works identically on the
// server (prerender) and in the browser — no more split SSR/browser init,
// no more disk reads in entry.server.tsx, no more async plugin imports here.
void i18n.use(initReactI18next).init({
  lng: getInitialLanguage(),
  fallbackLng,
  supportedLngs,
  resources,
  // Flat dotted keys are used throughout (e.g. "hero.badge", "nav.services").
  // Both separators must be disabled so the entire string is treated as a
  // literal key rather than being split into namespace / nested path segments.
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// ─── Browser-only side effects ─────────────────────────────────────────────────
if (isBrowser) {
  const syncDocumentLanguage = (lng: string) => {
    const code = normalizeLanguage(lng) ?? defaultLng;
    document.documentElement.lang = code;
    document.documentElement.dir = getLanguageDirection(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore storage write failures (e.g. private browsing).
    }
  };

  // Apply immediately for the current language (covers first load) and on
  // every subsequent manual switch via the language switcher.
  syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
  i18n.on("languageChanged", syncDocumentLanguage);
}

export default i18n;