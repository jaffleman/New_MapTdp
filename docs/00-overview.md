## **Présentation générale du projet**

MapTdp est une application métier destinée aux techniciens chargés de localiser rapidement la position des abonnés ADSL dans les salles de dégroupage. Elle corrèle des informations techniques (colonnes, niveaux, réglettes) pour simplifier et accélérer les interventions sur le terrain.

Le projet vise aujourd'hui à moderniser complètement MapTdp pour atteindre quatre objectifs majeurs :

1.  **Sécuriser** l’application (TLS, isolation réseau, gestion des secrets).
2.  **Rendre l’architecture scalable et résiliente** grâce à Kubernetes (K3s).
3.  **Automatiser tout le cycle de vie** via GitOps (Argo CD).
4.  **Centraliser et professionnaliser l’infrastructure** (PostgreSQL intégré au cluster, sauvegardes, monitoring).

L'application sera désormais accessible via :  
**<https://tdp.jaffleman.tech>**

Cette documentation couvre l’architecture, l’infrastructure, la migration et les opérations.

***