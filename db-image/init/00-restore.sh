#!/bin/sh
set -e

echo "------------------------------------------------------------"
echo "[INIT] Script de restauration démarré ($(date))"

# Emplacement standard pour les backups
BACKUP_DIR="/docker-entrypoint-initdb.d"

# Utilisateur superadmin (défini dans Dockerfile ou valeurs Helm)
DB_USER="${POSTGRES_USER:-postgres}"

echo "[INIT] Utilisateur pour restauration : $DB_USER"

# Vérifier psql
if ! command -v psql >/dev/null 2>&1; then
  echo "[ERREUR] psql introuvable. Impossible de restaurer."
  exit 1
fi

# Vérifier si base déjà existante
echo "[INIT] Vérification présence de maptdpbdd..."
if psql -U "$DB_USER" -tc "SELECT 1 FROM pg_database WHERE datname='maptdpbdd';" | grep -q 1; then
  echo "[INIT] La base maptdpbdd existe déjà. Restauration ignorée."
  exit 0
fi

echo "[INIT] Base absente → restauration requise."

# Recherche du backup SQL
echo "[INIT] Recherche du backup..."
LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/dump-*.sql 2>/dev/null | head -n 1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "[ERREUR] Aucun dump-*.sql trouvé dans $BACKUP_DIR."
  exit 1
fi

echo "[INIT] Backup détecté : $LATEST_BACKUP"

# Créer les bases manuellement
echo "[INIT] Création des bases maptdpbdd et geolockbdd..."
psql -U "$DB_USER" -v ON_ERROR_STOP=1 <<EOF
CREATE DATABASE maptdpbdd;
CREATE DATABASE geolockbdd;
EOF

# Import
echo "[INIT] Restauration en cours..."
psql -U "$DB_USER" -d maptdpbdd -f "$LATEST_BACKUP"
psql -U "$DB_USER" -d geolockbdd -f "$LATEST_BACKUP"

echo "[INIT] Restauration terminée avec succès."
echo "------------------------------------------------------------"

exit 0