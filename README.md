# Aero

A clean, standard React + Vite template called **Aero**.

## Project Documentation
To learn more about the project, check the following documents:
- [**Project Structure**](file:///p:/projects/Aero/STRUCTURE.md): Detailed directory trees and layout specifications.
- [**Completed Updates**](file:///p:/projects/Aero/UPDATES.md): Commit history and scaffolding history.
- [**Future Roadmap**](file:///p:/projects/Aero/ROADMAP.md): Future updates and planning tasks.

## Technical Stack
- React (Single Page Application)
- Vite (Fast development build server)
- JavaScript

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run in development mode**:
   ```bash
   npm run dev
   ```
3. **Compile for production (SPA)**:
   ```bash
   npm run build
   ```
4. **Compile with SSG pre-rendering (recommended for production)**:
   ```bash
   npm run build:ssg
   ```
   This pre-renders every route to a static HTML file so Google can index content without executing JavaScript.

---

## 🌐 SEO & Deployment Notes

### Custom Domain (Action Required)
After the site is live on Vercel, connect a custom domain:
1. Go to **Vercel Dashboard → Project → Settings → Domains**.
2. Add your custom domain and follow the DNS instructions.
3. Once the domain is confirmed, **update every reference** to `aeroteam.vercel.app` in the following files:
   - `index.html` — `og:image`, `twitter:image`, `og:url`, canonical `<link>`, and JSON-LD `url` fields
   - `public/sitemap.xml` — all `<loc>` values
   - `public/robots.txt` — the `Sitemap:` directive
   - `vite.config.ts` — `ssgOptions.includedRoutes` if base URL is used

### Social Previews (og:image / twitter:image)
- The OG image is expected at `https://aeroteam.vercel.app/og-image.jpg`.
- Place the actual image file at `public/og-image.jpg` (recommended: 1200×630 px).
- Validate previews at https://opengraph.xyz and https://cards-dev.twitter.com/validator.

### Sitemap & Robots
- `public/sitemap.xml` — add a new `<url>` entry for every new page/route added.
- `public/robots.txt` — no changes needed unless you want to block specific paths.

### JSON-LD Structured Data
The `<head>` in `index.html` contains Organization and WebSite schemas.
- Populate the `sameAs` array with real social profile URLs when they exist.
- Validate with https://search.google.com/test/rich-results.

