# Aero Team — Landing Page

**Aero Team** is a professional web development & SaaS agency. This repository contains the production landing page built with React, TypeScript, Vite, and TailwindCSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (SPA + optional SSG) |
| Language | TypeScript |
| Build Tool | Vite 7 |
| Styling | TailwindCSS v3 + custom CSS variables |
| i18n | i18next + react-i18next (English & Arabic, RTL supported) |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| Serverless API | Vercel Node.js functions (`/api/`) |
| Deployment | Vercel (auto-deploy from `main` branch) |

---

## Project Structure

```
Aero/
├── api/
│   └── contact.ts         # Serverless function: proxies form → Discord webhook
├── public/                # Static assets (favicons, og-image, manifest, etc.)
├── scripts/
│   └── prerender.mjs      # SSG script: pre-renders routes to static HTML
├── src/
│   ├── components/
│   │   ├── landing/       # Section components (Hero, Services, Projects, …)
│   │   ├── LegalLayout.tsx
│   │   └── language-switcher.tsx
│   ├── hooks/
│   │   └── use-theme.ts   # Dark/light theme toggle via data-theme attribute
│   ├── i18n/
│   │   └── locales/
│   │       ├── en.json    # English translations
│   │       └── ar.json    # Arabic translations
│   ├── pages/
│   │   ├── Index.tsx      # Home page
│   │   ├── Privacy.tsx
│   │   ├── Terms.tsx
│   │   └── Cookies.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css          # Global styles + CSS design tokens
├── index.html             # Vite entry HTML template
├── tailwind.config.ts
├── vite.config.ts
└── vercel.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

### Type-check
```bash
npm run check
```

---

## Build & Deployment

### Standard SPA build (Vercel uses this by default via `vercel-build`)
```bash
npm run build
```

### Static pre-rendering (SSG) — recommended for SEO
Generates pre-rendered HTML for all routes (`/`, `/privacy`, `/terms`, `/cookies`):
```bash
npm run build:ssg
```

> **Note**: Vercel automatically runs `npm run vercel-build` on deploy, which maps to `build:ssg`.

---

## Environment Variables

The contact form uses a Discord webhook routed through the serverless function at `/api/contact`.

| Variable | Description |
|---|---|
| `MESSAGE_WEBHOOK_URL` | Discord webhook URL for contact form submissions |

Set this in Vercel: **Project → Settings → Environment Variables**.

See [`.env.example`](.env.example) for the full list.

---

## i18n (Internationalization)

The site supports full English and Arabic with RTL layout. Translations live in:
- `src/i18n/locales/en.json` — English strings
- `src/i18n/locales/ar.json` — Arabic strings

Language is toggled via the navbar switcher and persisted in `localStorage`.

---

## Custom Domain (Action Required)

Once a custom domain is connected in Vercel, update all references to `aeroteam.vercel.app` in:
- `index.html` — `og:image`, `og:url`, canonical `<link>`, and JSON-LD `url`
- `public/sitemap.xml` — all `<loc>` values
- `public/robots.txt` — the `Sitemap:` directive

Also replace the `aero1code@gmail.com` placeholder with the professional domain email in:
- `src/components/landing/ContactSection.tsx`
- `src/pages/Privacy.tsx`, `Terms.tsx`, `Cookies.tsx`

All these locations are marked with `// TODO` comments in the source.

---

## Features

- ⚡ Fast, modern, dark/light themed landing page
- 🌍 Arabic / English bilingual with RTL support
- 📬 Contact form with server-side Discord webhook, rate limiting, and bot honeypot
- 🔒 No secrets in client-side code
- 📋 Legal pages: Privacy Policy, Terms of Service, Cookie Policy
- 🗂 Static pre-rendering via `scripts/prerender.mjs` for optimal SEO
