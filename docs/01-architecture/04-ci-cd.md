## **Chaîne CI/CD**

### CI (Intégration continue)

Chaque modification déclenche :

*   tests (frontend & backend)
*   analyse statique
*   vérification de sécurité
*   build des images Docker
*   scans de vulnérabilités
*   push dans un registre (GHCR prévu)

### CD (Déploiement continu)

Argo CD se synchronise automatiquement avec Git :

*   déploiements atomiques
*   rolling updates
*   rollbacks instantanés

### Stratégie de versioning

*   Images taguées en `sha-commit`
*   Versions stables en `vX.Y.Z`

***