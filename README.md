# 📘 **New\_MapTdp**

Modernisation complète de l'application **MapTdp**, une application destinée à faciliter la localisation des abonnés ADSL dans les salles de dégroupage grâce au référencement des colonnes, niveaux et réglettes des RCO.

Ce projet vise à reconstruire l’application selon les standards modernes du cloud et du DevOps :  
**conteneurisation, Kubernetes (K3s), GitOps, CI/CD, intégration PostgreSQL, sécurité, observabilité et automatisation complète.**

***

## 🚀 **Objectifs du projet**

*   Refonte complète de l’architecture MapTdp
*   Déploiement dans un **cluster K3s** auto‑géré
*   Intégration d'une base **PostgreSQL** en StatefulSet
*   Mise en place d’une chaîne **GitOps** avec Argo CD
*   Build, tests, scans et packaging via **CI/CD**
*   Sécurisation TLS (cert-manager + ACME OVH)
*   Observabilité avec **Prometheus, Grafana, Loki**
*   Documentation complète versionnée dans le dépôt

***

## 🧩 **Structure de l’application**

L’application est composée de trois blocs :

*   **Frontend** : ReactJS (build statique)
*   **Backend** : Node.js + Express.js (API REST)
*   **Base de données** : PostgreSQL (intégrée au cluster)

***

## ☸️ **Architecture cible**

*   Domaine unique : **<https://tdp.jaffleman.tech>**
*   Routage Traefik :
    *   `/` → frontend
    *   `/api` → backend
*   PostgreSQL déployé en StatefulSet avec stockage persistant
*   Déploiement entièrement automatisé via **Argo CD**
*   Environnements :
    *   `maptdp-dev`
    *   `maptdp-stg`
    *   `maptdp-prd`

***

## 📦 **Répertoires principaux**

    New_MapTdp/
      frontend/        → Code source du frontend React
      backend/         → Code source du backend Node/Express
      deploy/          → Manifests Kubernetes, Helm, GitOps
        charts/
        argocd/
        infra/
      docs/            → Documentation complète du projet
      .github/         → Workflows CI/CD

***

## 📚 **Documentation**

Toute la documentation est disponible dans le dossier :

➡️ `docs/`

Elle inclut :

*   architecture globale
*   Kubernetes
*   GitOps
*   CI/CD
*   sécurité
*   opération & monitoring
*   plan de migration
*   schémas et diagrammes

***

## 🔧 **GitOps & CI/CD**

Le projet utilise :

*   **Argo CD** pour les déploiements automatiques depuis Git
*   **GitHub Actions** pour :
    *   tests
    *   build
    *   scan de sécurité
    *   push d'images
    *   génération d’artefacts

***

## 🔐 **Sécurité**

*   TLS automatique (cert-manager + ACME OVH)
*   Isolation réseau via NetworkPolicies
*   Gestion sécurisée des secrets
*   Conteneurs non-root
*   Scans de vulnérabilités (CI/CD)

***

## 📈 **Observabilité**

*   **Prometheus** (metrics)
*   **Grafana** (dashboards)
*   **Loki** (logs)

***

## 🧭 **Roadmap (résumé)**

*   [ ] Conteneurisation front + back
*   [ ] Déploiement PostgreSQL en cluster
*   [ ] Mise en place Argo CD + App of Apps
*   [ ] Mise en place CI/CD
*   [ ] Configuration cert-manager + OVH DNS
*   [ ] Monitoring / logs
*   [ ] Migration de la base existante
*   [ ] Mise en production sur tdp.jaffleman.tech

***

## 🤝 **Auteur**

Projet développé et modernisé par **Sébastien MATHURIN**, dans le cadre d’un parcours DevOps/Kubernetes complet.
