# MapTDP - PRD & Architecture

## Problem Statement
1. Refonte UI: Modern / Black / Glassmorphism / Responsive
2. Favicon dark/cyan
3. Auth JWT (inscription, connexion, déconnexion)
4. PWA offline
5. Palette plus sobre noir/gris (pas de néon) + mode jour/nuit

## Architecture
- **Frontend**: React 16 + Redux + React Router v5 + Bootstrap 4
- **Backend**: FastAPI (Python) port 8001 → Auth JWT + Proxy Express
- **Express Backend**: Node.js + Sequelize + PostgreSQL (TDP routes)
- **Database**: MongoDB (users) + PostgreSQL (TDP)
- **Theming**: CSS variables + data-theme attribute (dark/light) + ThemeContext

## What's Been Implemented (Jan 2026)

### Iteration 1 — UI Redesign
- [x] Thème noir glassmorphism, responsive, FontAwesome 6, Manrope + JetBrains Mono

### Iteration 2 — Auth + PWA + Favicon
- [x] JWT auth (register/login/logout), PWA manifest + service worker, favicon cyan

### Iteration 3 — Palette sobre + Mode jour/nuit
- [x] Palette noir/gris sobre : accent #a0a0a0 (dark), #4a4a4a (light), zéro néon
- [x] ThemeContext avec localStorage persistence
- [x] Mode jour : fond #f5f5f5, surface blanche, texte noir
- [x] Mode nuit : fond #0c0c0c, surface gris foncé, texte gris clair
- [x] Toggle soleil/lune dans header + page d'auth
- [x] Transition fluide 0.4s entre thèmes
- [x] Tous les composants utilisent CSS variables (AuthPage, Cards, Badges, Modals)
- Tests: 100%

## Prioritized Backlog
### P1
- Rôles (admin/technicien), profil, historique serveur

### P2
- Dashboard stats, export PDF, notifications push
