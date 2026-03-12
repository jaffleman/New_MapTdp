## **Architecture GitOps**

L’ensemble du déploiement est géré via **Argo CD**, qui surveille en permanence le dépôt Git du projet.

### **Modèle App-of-Apps**

Le projet utilise une architecture GitOps hiérarchique :

1.  **Application racine (Root App)**
    *   Définit les sous-applications à déployer
    *   Structure l’infrastructure

2.  **Applications enfants**
    *   cert-manager
    *   ingress
    *   maptpd (front, back, database)
    *   monitoring
    *   sécurité

### **Cycle GitOps**

1.  Push dans Git
2.  Argo CD détecte la modification
3.  Synchronisation automatique
4.  Déploiement dans le cluster
5.  Rollback possible instantanément via Git

### **Environnements**

Chaque environnement a ses propres `values` :

*   `dev` : tests et développement
*   `staging` : validation
*   `production` : service réel

***