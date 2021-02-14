-- How to run?
-- 1) start postgres service
-- 2) run postgres
-- 3) \i <path_to_this_init.sql_file>

CREATE DATABASE rentr;
\c rentr

CREATE EXTENSION CITEXT;

CREATE TABLE IF NOT EXISTS "User" (
    "uId" SERIAL PRIMARY KEY,
    "uEmail" CITEXT UNIQUE NOT NULL,
    "uPassword" VARCHAR(50) NOT NULL
);

INSERT INTO "User" ("uId", "uEmail", "uPassword") VALUES 
(1, 'bosco@gmail.com', 'bosco123'),
(2, 'justin@gmail.com', 'justin123'),
(3, 'ronnie@gmail.com', 'ronnie123'),
(4, 'azizul@gmail.com', 'azizul123'),
(5, 'nathan@gmail.com', 'nathan123');

SELECT * FROM "User";