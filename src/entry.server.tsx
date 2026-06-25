/**
 * SSR entry point used ONLY by the prerender build step.
 * This file is NOT loaded in the browser.
 *
 * It exports a `render` function that react-dom/server uses to
 * produce the initial HTML string for a given URL.
 *
 * Browser-only APIs (i18n language detection, cookies, etc.)
 * are excluded here — the client bundle handles those on hydration.
 */
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { StaticRouter } from "react-router-dom";
import App from "./App";
// CSS imports are no-ops in the SSR context (Vite strips them server-side).
import "./index.css";

export function render(url: string): string {
  return renderToString(
    createElement(StaticRouter, { location: url }, createElement(App))
  );
}
