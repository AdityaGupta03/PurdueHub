#!/bin/bash

db_name="purduehub"

echo
echo "Creating database $db_name"
echo

export PGPASSWORD="postgres"

psql -U postgres -c "CREATE DATABASE $db_name;"
psql -U postgres --dbname=$db_name --file=./database/database.sql

echo
psql -U postgres -c "\l"
echo "Listing relations in $db_name..."
echo
psql -U postgres --dbname=$db_name -c "\dt"

db_name="purduehub_test"

echo
echo "Creating database $db_name"
echo

psql -U postgres -c "CREATE DATABASE $db_name;"
psql -U postgres --dbname=$db_name --file=../server/database/database.sql

echo
psql -U postgres -c "\l"
echo "Listing relations in $db_name..."
echo
psql -U postgres --dbname=$db_name -c "\dt"