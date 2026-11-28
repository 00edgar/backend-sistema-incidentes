SELECT format('CREATE ROLE %I LOGIN CREATEDB PASSWORD %L', :'usuario', :'clave')
WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = :'usuario')
\gexec

SELECT format('ALTER ROLE %I LOGIN CREATEDB PASSWORD %L', :'usuario', :'clave')
WHERE EXISTS (SELECT 1 FROM pg_roles WHERE rolname = :'usuario')
\gexec

SELECT format('CREATE DATABASE %I OWNER %I', :'baseDatos', :'usuario')
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = :'baseDatos')
\gexec
