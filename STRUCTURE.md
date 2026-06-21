# Aero Project Structure

This document outlines the directory structure and main files for the Aero Telemetry Hub application.

## Directory Tree

```text
aero/
├── .gitignore              # Git ignore files and directories
├── eslint.config.js        # ESLint configuration rule settings
├── index.html              # Core HTML entry template (with pre-imported Outfit and Plus Jakarta Sans fonts)
├── package.json            # Scripts, dependency details, and package configuration
├── vite.config.js          # Vite build and development server configurations
├── UPDATES.md              # Log of all updates and commits
├── ROADMAP.md              # Planned next updates and roadmap
├── STRUCTURE.md            # Project directory tree and file explanation (this file)
└── src/
    ├── main.jsx            # Entry scripting rendering mounting to root
    ├── App.jsx             # Main React entrypoint detailing physics simulation, canvas loop, and layouts
    ├── App.css             # Stylesheet for dashboard cards, controls, vectors, and layouts
    └── index.css           # Global theme variables, animations, scrollbars, and grid background
```

## Main Files Reference

### 1. Global Setup
- **`index.html`**: Root viewport definitions, page SEO meta descriptions, and Google Font link loads.
- **`src/main.jsx`**: Bootstraps the application inside React StrictMode and binds the `#root` element.

### 2. Stylesheets
- **`src/index.css`**: Defines CSS color variables for dark-theme and light-theme modes, global reset styling, background grid overlays, custom scrollbars, and keyframes for animations (float, spin, scanline, fade-in).
- **`src/App.css`**: Glassmorphic layout panels, interactive custom range input sliders, animated switch toggles, vector indicators, vector labels, log consoles, and chart wrappers.

### 3. Application Components
- **`src/App.jsx`**: Main logic component containing state hooks for sliders and options, mathematical models for lift ($C_L$) and drag ($C_D$) calculations, stall event thresholds, canvas render loop for particle streamline physics, canvas-based live line graph plotting, theme triggers, and live logging streams.
