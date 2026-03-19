# MapTDP - PRD & Architecture

## Problem Statement
1. Refonte complète UI: Modern / Black / Animation simple / Glassmorphism / Responsive
2. Nouveau favicon dans le style dark/cyan
3. Gestion d'utilisateurs JWT (inscription, connexion, déconnexion)
4. Mode PWA avec cache offline des dernières recherches

## Architecture
- **Frontend**: React 16 + Redux + React Router v5 + React Bootstrap 4
- **Backend**: FastAPI (Python) on port 8001 → Auth JWT + Proxy to Express
- **Express Backend**: Node.js + Sequelize + PostgreSQL (TDP routes)
- **Database**: MongoDB (users) + PostgreSQL (TDP data)
- **Styling**: CSS Variables, Glassmorphism, FontAwesome 6, Google Fonts (Manrope + JetBrains Mono)
- **Auth**: JWT tokens stored in localStorage, AuthContext provider
- **PWA**: Service Worker + manifest.json for offline support

## User Personas
- Techniciens télécoms terrain utilisant l'app sur mobile

## Core Requirements (Static)
- Recherche de TDP par texte
- Historique des recherches récentes
- Création/modification de répartiteurs
- Authentification utilisateur
- Mode offline

## What's Been Implemented

### Iteration 1 (Jan 2026) - UI Redesign
- [x] Thème noir (#050505) avec glassmorphism subtil
- [x] Accent cyan électrique (#00F0FF) avec glow effects
- [x] Fonts: Manrope + JetBrains Mono
- [x] FontAwesome 6 icons
- [x] Animations: fadeSlideUp, hover transitions, scale
- [x] Responsive: mobile → desktop
- [x] Bootstrap 4 overrides (buttons, modals, tabs, badges, inputs)
- [x] data-testid sur éléments interactifs
- Tests: 100% frontend

### Iteration 2 (Jan 2026) - Auth + PWA + Favicon
- [x] Favicon: icône map pin cyan sur fond noir
- [x] Auth JWT: register, login, me endpoints (FastAPI + MongoDB)
- [x] AuthPage: formulaire login/register avec glassmorphism
- [x] AuthContext: state management + token localStorage
- [x] Header: username + bouton logout
- [x] Routes protégées
- [x] manifest.json: PWA config (standalone, theme-color)
- [x] Service Worker: cache static assets + fonts CDN
- [x] Apple Web App meta tags
- Tests: backend 100%, frontend 95%

## Prioritized Backlog
### P1
- Rôles utilisateur (admin/technicien)
- Historique de recherches lié au compte
- Notifications PWA push

### P2
- Thème clair/sombre toggle
- Dashboard statistiques
- Export résultats PDF
- Profil utilisateur avec avatar
