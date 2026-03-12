## **Architecture Kubernetes**

### **Cluster K3s**

Le cluster K3s héberge l’ensemble des composants MapTdp.  
Il inclut :

*   le control-plane et ses API
*   Traefik comme Ingress Controller
*   le CNI pour le réseau des pods
*   un StorageClass pour les volumes persistants

### **Namespaces**

Chaque environnement est isolé :

*   `maptdp-dev`
*   `maptdp-stg`
*   `maptdp-prd`

### **Séparation logique des composants**

*   **Frontend** : Deployment + Service
*   **Backend** : Deployment + Service
*   **PostgreSQL** : StatefulSet + Service interne
*   **Ingress** : exposé sur le domaine public
*   **NetworkPolicies** : isolation stricte entre composants

***