# Aero Project Structure

This document outlines the detailed directory structure, configuration setups, and file responsibilities for the Aero application.

## Directory Tree

```text
aero/
├── .git/                   # Git repository configuration metadata
├── .gitignore              # Files and directories ignored by version control
├── LICENSE                 # Project license agreement (pulled from remote repository)
├── eslint.config.js        # ESLint flat configuration for code linting and style rules
├── index.html              # Core HTML5 entry template (Title: "Aero")
├── package.json            # NPM scripts, metadata, and project dependency tree
├── vite.config.js          # Vite configuration for development server and asset bundler
├── UPDATES.md              # Historical log of updates and Git commits
├── ROADMAP.md              # Planned next updates and feature development list
├── STRUCTURE.md            # Detailed structural guide (this file)
└── src/
    ├── main.jsx            # Entry script rendering the React application root
    ├── App.jsx             # Root React component defining the user interface structure
    ├── App.css             # Component-specific styles for the App dashboard
    ├── index.css           # Global CSS rules, typography imports, and styling variables
    └── assets/             # Vector images and media assets used across components
        └── react.svg       # React identity vector asset
```

---

## Configuration Files Breakdown

### 1. Build and Scaffolding Config
- **[`vite.config.js`](file:///p:/projects/Aero/vite.config.js)**: Configures Vite to use the official `@vitejs/plugin-react` plugin for Fast Refresh (HMR). Defines compile targets and default development server behaviors.
- **[`eslint.config.js`](file:///p:/projects/Aero/eslint.config.js)**: Implements ESLint's flat config format, defining rules for React hooks, target ES modules, and formatting lint errors.
- **[`package.json`](file:///p:/projects/Aero/package.json)**:
  - **Dependencies**: React core library (`react`, `react-dom`).
  - **Dev Dependencies**: Vite build engine, ESLint frameworks, and React plugins.
  - **Scripts**:
    * `npm run dev`: Boots the local development hot-reloads web server.
    * `npm run build`: Bundles optimized, minified production assets into `/dist`.
    * `npm run lint`: Executes syntax/style inspections on source files.
    * `npm run preview`: Launches a server to preview production builds locally.

---

## Source Directory (`/src`) Overview

### 1. Bootstrapping
- **[`main.jsx`](file:///p:/projects/Aero/src/main.jsx)**: Binds the root React component ([`App`](file:///p:/projects/Aero/src/App.jsx)) to the HTML template container (`div#root`) inside a `StrictMode` context.

### 2. Layouts and Views
- **[`App.jsx`](file:///p:/projects/Aero/src/App.jsx)**: The central functional component containing the primary landing elements and counter states.
- **[`App.css`](file:///p:/projects/Aero/src/App.css)**: Styles specific UI widgets, interactive states, keyframes, transitions, and layout frames.
- **[`index.css`](file:///p:/projects/Aero/src/index.css)**: Manages global HTML/body definitions, layout frameworks, fonts, and dark/light color variables.
