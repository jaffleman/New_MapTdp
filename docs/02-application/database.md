## **Base PostgreSQL**

La base contient les informations :

*   colonnes (fermes)
*   niveaux (1 à 8)
*   réglettes
*   associations entre positions et abonnés

### Déploiement en cluster

PostgreSQL est déployé en :

*   **StatefulSet**
*   avec **volumes persistants**
*   sauvegardes régulières
*   accès interne uniquement

### Points clés

*   disponibilité fiable
*   stockage dans un volume K3s
*   sécurisation stricte du réseau
*   aucune exposition externe

***