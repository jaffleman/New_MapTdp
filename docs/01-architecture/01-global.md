# 📄 **01-architecture/01-global.md**

## **Architecture globale**

L’architecture cible repose sur trois composants principaux :

*   un **frontend** React (build statique, servi par un serveur HTTP léger)
*   un **backend** Node.js/Express (API REST)
*   une **base de données PostgreSQL** intégrée au cluster K3s

Ils sont exposés derrière un **Ingress Controller Traefik** avec un domaine unique :  
**tdp.jaffleman.tech**

Le routage est basé sur les chemins :

*   `/` → frontend
*   `/api` → backend

## **Flux général**

1.  L’utilisateur accède à tdp.jaffleman.tech en HTTPS.
2.  Traefik reçoit la requête, applique les règles et redirige :
    *   vers le frontend pour les fichiers statiques,
    *   vers le backend pour les appels API.
3.  Le backend interroge PostgreSQL via un service interne sécurisé.

## **Résumé des technologies**

*   **Cluster** : K3s
*   **Frontend** : ReactJS (build statique)
*   **Backend** : Node.js / Express
*   **Base** : PostgreSQL en StatefulSet
*   **Ingress** : Traefik
*   **Certificats** : cert-manager + ACME OVH
*   **GitOps** : Argo CD
*   **Monitoring** : Prometheus + Grafana + Loki

***