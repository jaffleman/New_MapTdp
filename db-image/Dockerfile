FROM postgres:16-alpine

# Évite les locales inutiles, image minimale
ENV LANG=en_US.utf8 \
    LC_ALL=en_US.utf8 \
    POSTGRES_DB=postgres

# Copie des scripts d'init
# Tous les *.sql et *.sh de ce dossier seront exécutés au premier démarrage (data dir vide)
COPY init/ /docker-entrypoint-initdb.d/