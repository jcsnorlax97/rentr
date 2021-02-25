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
    password VARCHAR CHECK (length(password) <= 100) NOT NULL
);

INSERT INTO rentr_user(email, password) VALUES 
('bosco@gmail.com', '$2b$10$b8/KshrtCRlab2qos7M1zO8cbAB7G4bB3RsN7bH8b21L9YiKbc51G'),
('justin@gmail.com', '$2b$10$b8/KshrtCRlab2qos7M1zO8cbAB7G4bB3RsN7bH8b21L9YiKbc51G'),
('ronnie@gmail.com', '$2b$10$b8/KshrtCRlab2qos7M1zO8cbAB7G4bB3RsN7bH8b21L9YiKbc51G'),
('azizul@gmail.com', '$2b$10$b8/KshrtCRlab2qos7M1zO8cbAB7G4bB3RsN7bH8b21L9YiKbc51G'),
('nathan@gmail.com', '$2b$10$b8/KshrtCRlab2qos7M1zO8cbAB7G4bB3RsN7bH8b21L9YiKbc51G');

SELECT * FROM rentr_user;

CREATE TABLE IF NOT EXISTS rentr_listing (
    id BIGSERIAL PRIMARY KEY, 
    title VARCHAR CHECK (length(title) <= 100) NOT NULL,
    description VARCHAR CHECK (length(description) <= 5000) NOT NULL,
    num_bedroom VARCHAR CHECK (length(num_bedroom) <= 10) NOT NULL,
    num_bathroom VARCHAR CHECK (length(num_bathroom) <= 10) NOT NULL
);

INSERT INTO rentr_listing(title, description, num_bedroom, num_bathroom) VALUES 
('Expensive one', 'one million dollars', '>10', '5'),
('An appartment with full of bathroom', 'Smells Good.', '1', '>10'),
('Serious appartment', ' An appartment closed to the university and the bus stop. Contact me! ', '3', '2');

SELECT * FROM rentr_listing;