# --- Étape 1 : Build (Node 20 is fine for react-scripts 5) ----
FROM node:20-alpine AS build

# Améliore les temps de build et évite d'installer des dépendances optionnelles
ENV CI=true
WORKDIR /app

# Copie sélective pour maximiser le cache
# On copie package.json + lockfiles (si présents)
COPY package.json package-lock.json* yarn.lock* ./

#La variable d'environnement pour l'URL de l'API backend
# ENV REACT_APP_URL=http://maptdp-dev-maptdp-backend.maptdp.svc.cluster.local:8000
ENV REACT_APP_URL=https://api.dev.jaffleman.tech

# Installe les deps en respectant le lockfile détecté
# - npm si package-lock.json existe
# - yarn si yarn.lock existe
# - sinon fallback npm install
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    else npm install --no-audit --no-fund; fi

# Copie du reste de l'application
COPY . .

# Build production (CRA)
# Si jamais tu as une ancienne dépendance OpenSSL-1, tu peux décommenter la ligne suivante :
# ENV NODE_OPTIONS=--openssl-legacy-provider
RUN if [ -f yarn.lock ]; then yarn build; else npm run build; fi


# --- Étape 2 : Runtime (Nginx) ---
FROM nginx:1.25-alpine

# Nettoie la conf par défaut et ajoute la nôtre (SPA + cache statique)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copie les fichiers statiques compilés
COPY --from=build /app/build /usr/share/nginx/html

# Healthcheck simple
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1/healthz || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]