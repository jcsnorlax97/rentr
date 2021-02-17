-- How to run?
-- 1) start postgres service
-- 2) run postgres
-- 3) \i <path_to_this_init.sql_file>

CREATE DATABASE rentr;
\c rentr

CREATE EXTENSION citext;

CREATE TABLE IF NOT EXISTS rentr_user (
    id SERIAL PRIMARY KEY,
    email CITEXT UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO rentr_user(email, password) VALUES 
('bosco@gmail.com', 'bosco123'),
('justin@gmail.com', 'justin123'),
('ronnie@gmail.com', 'ronnie123'),
('azizul@gmail.com', 'azizul123'),
('nathan@gmail.com', 'nathan123');

SELECT * FROM rentr_user;