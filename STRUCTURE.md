# Aero Project Structure

This document outlines the directory structure and main files for the Aero application.

## Directory Tree

```text
aero/
├── .gitignore              # Git ignore configuration
├── LICENSE                 # License file pulled from the remote repository
├── eslint.config.js        # ESLint rule configuration
├── index.html              # Main HTML page template (Title: "Aero")
├── package.json            # Scripts, dependency declarations, and package options
├── vite.config.js          # Vite developer and production bundler configuration
├── UPDATES.md              # Log of all updates and commits
├── ROADMAP.md              # Planned next updates and roadmap
├── STRUCTURE.md            # Project directory tree and file explanation (this file)
└── src/
    ├── main.jsx            # React root DOM rendering and bootstrap mount
    ├── App.jsx             # Root React component containing the standard template
    ├── App.css             # Component-level styling for the default App view
    ├── index.css           # Global core layout styles
    └── assets/             # Vector images and media resources
        └── react.svg       # React icon asset
```

## Main Files Reference

### 1. Global Configuration
- **`index.html`**: Entry page containing the viewport meta tag, mounting container `#root`, and the page title `<title>Aero</title>`.
- **`src/main.jsx`**: Binds the application to the `#root` element using React DOM client tools.

### 2. Assets and Styles
- **`src/index.css`**: Holds global styles for typography and body layouts.
- **`src/App.css`**: Stylesheet targeting standard template layout cards, logo rotation animations, and interactive buttons.

### 3. Application Components
- **`src/App.jsx`**: Holds the default Vite landing interface with the interactive click counter.
