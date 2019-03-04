\! echo "--- INIT SCRIPT ---"

DROP SCHEMA IF EXISTS frontenddev CASCADE;

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT                       -- SELECT list can stay empty for this
      FROM   pg_catalog.pg_roles
      WHERE  rolname = 'frontenddev') THEN
      CREATE USER frontenddev WITH ENCRYPTED PASSWORD 'frontenddev';
   END IF;
END
$do$;

CREATE SCHEMA frontenddev AUTHORIZATION frontenddev;

\! echo "Creating Tables..."

\! echo "Granting Schema Privs..."
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA frontenddev TO frontenddev;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA frontenddev TO frontenddev;
