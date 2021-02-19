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
    password VARCHAR(500) NOT NULL
);

INSERT INTO rentr_user(email, password) VALUES 
('bosco@gmail.com', 'bosco123'),
('justin@gmail.com', 'justin123'),
('ronnie@gmail.com', 'ronnie123'),
('azizul@gmail.com', 'azizul123'),
('nathan@gmail.com', 'nathan123');

SELECT * FROM rentr_user;

CREATE TABLE IF NOT EXISTS rentr_listing (
    id BIGSERIAL PRIMARY KEY, 
    title VARCHAR(100) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    num_bedroom VARCHAR(10) NOT NULL,
    num_bathroom VARCHAR(10) NOT NULL
);

INSERT INTO rentr_listing(title, description, num_bedroom, num_bathroom) VALUES 
('Expensive one', 'one million dollars', '>10', '5'),
('An appartment with full of bathroom', 'Smells Good.', '1', '>10'),
('Serious appartment', ' An appartment closed to the university and the bus stop. Contact me! ', '3', '2');

SELECT * FROM rentr_listing;