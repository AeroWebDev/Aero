/**
 * prerender.mjs — Static pre-rendering for Aero Studio
 *
 * Invoked via `npm run build:ssg`:
 *   1. Runs a standard Vite client build  → dist/
 *   2. Runs a Vite SSR build of entry.server.tsx → dist/server/
 *   3. Uses react-dom/server to render each route to HTML
 *   4. Injects the HTML into the dist/index.html shell
 *
 * Add routes to ROUTES_TO_PRERENDER as the site grows.
 *
 * NOTE: Once a custom domain is configured in Vercel (Settings → Domains),
 * update the base URL in index.html, sitemap.xml, and robots.txt.
 */

import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = join(ROOT, "dist");
const SERVER_DIST = join(DIST, "server");

// Routes that will be pre-rendered to static HTML.
const ROUTES_TO_PRERENDER = ["/", "/privacy", "/terms", "/cookies"];

async function main() {
  console.log("📦 Step 1/3 — Building client bundle...");
  await build({ root: ROOT, logLevel: "warn" });

  console.log("🔧 Step 2/3 — Building SSR bundle...");
  await build({
    root: ROOT,
    logLevel: "warn",
    build: {
      ssr: true,
      outDir: SERVER_DIST,
      rollupOptions: {
        input: join(ROOT, "src", "entry.server.tsx"),
      },
    },
  });

  console.log("🖨️  Step 3/3 — Pre-rendering routes...");
  const template = readFileSync(join(DIST, "index.html"), "utf-8");

  // Dynamically import the SSR bundle (it's a plain CJS/ESM module).
  const serverEntryUrl = pathToFileURL(join(SERVER_DIST, "entry.server.js")).href;
  const { render } = await import(serverEntryUrl);

  let successCount = 0;

  for (const route of ROUTES_TO_PRERENDER) {
    try {
      const appHtml = render(route);
      
      let cleanAppHtml = appHtml;
      const extractedHeadTags = [];
      
      // Loop to match and remove leading <title>, <meta>, <link> tags that React 19 hoisted
      while (true) {
        const match = cleanAppHtml.match(/^\s*(<(title)\b[^>]*>[\s\S]*?<\/title>|<(meta|link)\b[^>]*\/?>)/i);
        if (!match) break;
        
        const tag = match[1];
        extractedHeadTags.push(tag);
        cleanAppHtml = cleanAppHtml.slice(match[0].length);
      }
      
      // Categorize tags for precise template injection
      let titleTag = "";
      let descriptionTag = "";
      let canonicalTag = "";
      const otherTags = [];
      
      for (const tag of extractedHeadTags) {
        if (/<title\b/i.test(tag)) {
          titleTag = tag;
        } else if (/<meta\s+name=["']description["']/i.test(tag) || /<meta\s+content=["'][^"']*["']\s+name=["']description["']/i.test(tag)) {
          descriptionTag = tag;
        } else if (/<link\s+rel=["']canonical["']/i.test(tag)) {
          canonicalTag = tag;
        } else {
          otherTags.push(tag);
        }
      }
      
      let html = template;
      
      // Replace default title
      if (titleTag) {
        html = html.replace(/<title>.*?<\/title>/i, titleTag);
      }
      
      // Replace default description
      if (descriptionTag) {
        html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, descriptionTag);
      }
      
      // Replace default canonical URL
      if (canonicalTag) {
        html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, canonicalTag);
      }
      
      // Inject other hoisted elements (preloads, etc.) into head
      if (otherTags.length > 0) {
        const otherTagsHtml = "\n  " + otherTags.join("\n  ");
        html = html.replace("</head>", `${otherTagsHtml}\n</head>`);
      }
      
      // Inject final body HTML
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${cleanAppHtml}</div>`
      );

      // / → dist/index.html,  /about → dist/about/index.html
      const routeDir = route === "/" ? DIST : join(DIST, ...route.split("/").filter(Boolean));
      mkdirSync(routeDir, { recursive: true });
      writeFileSync(join(routeDir, "index.html"), html);

      console.log(`  ✅ ${route}`);
      successCount++;
    } catch (err) {
      console.warn(`  ⚠️  Could not pre-render ${route}:`, err.message);
    }
  }

  console.log(`\n🚀 Pre-rendering done — ${successCount}/${ROUTES_TO_PRERENDER.length} route(s) rendered.`);
}

main().catch((err) => {
  console.error("\n❌ Pre-render failed:", err);
  process.exit(1);
});
