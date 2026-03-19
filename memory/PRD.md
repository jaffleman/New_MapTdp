# MapTDP - PRD & Architecture

## Problem Statement
Refonte complète de l'interface MapTDP : Modern / Black / Animation simple / Glassmorphism / Responsive.

## Architecture
- **Frontend**: React 16 + Redux + React Router v5 + React Bootstrap 4
- **Backend**: Express.js + Sequelize + PostgreSQL (inchangé)
- **Styling**: CSS Variables, Glassmorphism, FontAwesome 6, Google Fonts (Manrope + JetBrains Mono)

## User Personas
- Techniciens télécoms terrain utilisant l'app sur mobile pour rechercher des positions TDP

## Core Requirements (Static)
- Recherche de TDP par texte
- Historique des recherches récentes
- Création/modification de répartiteurs
- Affichage hiérarchique des résultats (Rep > Salle > RCO > TDP)

## What's Been Implemented (Jan 2026)
- [x] Refonte CSS complète : thème noir (#050505) avec glassmorphism
- [x] Variables CSS pour tout le système de couleurs/spacing
- [x] Accent cyan électrique (#00F0FF) avec effets de glow
- [x] Google Fonts : Manrope (UI) + JetBrains Mono (données)
- [x] FontAwesome 6 pour les icônes (remplacement emoji)
- [x] Animations : fadeSlideUp sur les cards, hover transitions, scale sur click
- [x] Responsive complet : mobile (390px) à desktop (1920px)
- [x] Override Bootstrap 4 : boutons, modals, dropdowns, tabs, badges, inputs
- [x] Cards glassmorphism avec backdrop-filter blur
- [x] data-testid sur tous les éléments interactifs
- [x] Tests passés : 100% frontend

## Prioritized Backlog
### P0 (Done)
- Refonte UI complète
- Responsive design

### P1
- Navigation par onglets ou sidebar pour les pages
- Mode offline / PWA pour usage terrain
- Animations de transition entre pages

### P2
- Thème clair/sombre toggle
- Dashboard avec statistiques de recherches
- Export des résultats en PDF
