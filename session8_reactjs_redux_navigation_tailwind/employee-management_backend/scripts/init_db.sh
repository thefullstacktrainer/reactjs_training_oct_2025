#!/bin/bash

# =========================================================
# Database initialization script for Employee Management
# =========================================================

# Exit on error
set -e

# Load .env variables if available
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Default values (if .env not set)
PGUSER=${PGUSER:-postgres}
PGPASSWORD=${PGPASSWORD:-postgres}
PGHOST=${PGHOST:-localhost}
PGPORT=${PGPORT:-5432}
PGDATABASE=${PGDATABASE:-employee_management}

echo "Checking PostgreSQL connection..."
PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -p $PGPORT -d postgres -c "SELECT version();" > /dev/null

# Create database if it doesn't exist
if ! PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -p $PGPORT -lqt | cut -d \| -f 1 | grep -qw $PGDATABASE; then
  echo "Creating database '$PGDATABASE'..."
  PGPASSWORD=$PGPASSWORD createdb -h $PGHOST -U $PGUSER -p $PGPORT $PGDATABASE
else
  echo "Database '$PGDATABASE' already exists."
fi

# Run schema.sql
echo "Running schema.sql..."
PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -p $PGPORT -d $PGDATABASE -f ./db/schema.sql

echo "Database initialized successfully!"
