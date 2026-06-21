# Project Roadmap & Next Updates

This document outlines the features and components planned for the next iterations of the Aero Telemetry Hub.

## Phase 1: Interactive Aerofoil Designer
- [ ] **Custom Aerofoil Profiler**: Allow users to drag Bezier control points to reshape the aerofoil in real-time, recalculating camber and thickness values.
- [ ] **Preset Profiles**: Include a dropdown menu of standard NACA profiles (NACA 0012, NACA 2412, NACA 4412, etc.).

## Phase 2: Enhanced Physics & Environmental Factors
- [ ] **Wind Shear & Gusts**: Add controls to simulate sudden wind speed drops or directional gusts, with corresponding log warning alerts.
- [ ] **Mach Number and Compressibility**: Calculate and display the Mach number, and simulate shock waves/drag divergence at high speeds.

## Phase 3: Telemetry Analysis & Exporting
- [ ] **Data Export module**: Download log streams and telemetry histories as CSV or JSON files.
- [ ] **Airfoil Comparisons**: Side-by-side overlay comparison of lift/drag curves for different airfoil shapes or flap angles.

## Phase 4: Unit Testing & Performance
- [ ] **Math Helpers Tests**: Add unit tests for lift/drag coefficient calculations and Reynolds number scaling.
- [ ] **Off-screen Canvas rendering**: Optimize particle physics drawing on a separate off-screen thread.
