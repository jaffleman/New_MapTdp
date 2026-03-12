## **Frontend ReactJS**

Le frontend MapTdp est une application légère, compilée en ressources statiques :

*   HTML
*   CSS
*   JavaScript
*   assets de build

### Fonctionnement

*   récupère les données via `/api`
*   côté client, aucune logique complexe
*   consommateur passif de l’API backend

### Points importants

*   le backend doit être accessible via la même origine
*   les variables d'environnement définissent l’URL de l’API
*   le build n’a pas besoin d’état

***