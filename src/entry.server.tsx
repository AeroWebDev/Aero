/**
 * SSR entry point used ONLY by the prerender build step.
 * This file is NOT loaded in the browser.
 *
 * It exports a `render` function that react-dom/server uses to
 * produce the initial HTML string for a given URL.
 *
 * Fix: i18next-http-backend only runs in the browser, so this file
 * reads the locale JSON files directly from disk (synchronously) and
 * injects them into the i18n instance before every renderToString call.
 * Without this step every t() call returns the raw key string.
 */
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { StaticRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Importing the config initialises the shared i18n singleton so that
// useTranslation() inside App / components finds an instance.
import i18n from "./i18n/config";
import { supportedLngs } from "./i18n/util";
import App from "./App";
// CSS imports are no-ops in the SSR context (Vite strips them server-side).
import "./index.css";

// ── Load translations synchronously from dist/locales/ ────────────────────────
// After the client build step, Vite copies everything in public/ to dist/.
// This bundle lives in dist/server/, so locales are exactly one level up.
const __ssrDirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__ssrDirname, "../locales");

let translationsLoaded = false;

function loadTranslations(): void {
  if (translationsLoaded) return;
  for (const lng of supportedLngs) {
    try {
      const raw = readFileSync(resolve(localesDir, `${lng}.json`), "utf-8")
        .replace(/^\uFEFF/, ""); // strip UTF-8 BOM that editors sometimes add
      const resources = JSON.parse(raw) as Record<string, string>;
      // addResourceBundle(lng, namespace, resources, deep, overwrite)
      i18n.addResourceBundle(lng, "translation", resources, true, true);
    } catch (err) {
      console.warn(`[SSR] Could not load locale "${lng}" from ${localesDir}:`, err);
    }
  }
  translationsLoaded = true;
}

// ─────────────────────────────────────────────────────────────────────────────

export function render(url: string): string {
  // Ensure translations are loaded before the first render.
  // The guard flag prevents repeated disk reads across multiple routes.
  loadTranslations();

  return renderToString(
    createElement(StaticRouter, { location: url }, createElement(App))
  );
}
