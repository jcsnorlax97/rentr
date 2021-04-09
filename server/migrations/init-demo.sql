-- How to run?
-- 1) start postgres service
-- 2) run postgres
-- 3) \i <path_to_this_init.sql_file>

CREATE DATABASE rentr;
\c rentr

CREATE EXTENSION citext;

DROP TABLE rentr_comment;
DROP TABLE rentr_chain;
DROP TABLE rentr_listing;
DROP TABLE rentr_user;

CREATE TABLE IF NOT EXISTS rentr_user (
    id SERIAL PRIMARY KEY,
    email CITEXT UNIQUE NOT NULL,
    password VARCHAR CHECK (length(password) <= 100) NOT NULL
);

INSERT INTO rentr_user(email, password) VALUES 
('demo@gmail.com', '$2b$10$VcG9Jd24EM.wOH6EIBXY5uKvuV7wOr7wyqIilOOil/uJCUvQTIxKG');

CREATE TABLE IF NOT EXISTS rentr_listing (
    id BIGSERIAL PRIMARY KEY, 
    userid INTEGER,
    is_available BOOLEAN NOT NULL,
    title VARCHAR CHECK (length(title) <= 100) NOT NULL,
    price NUMERIC NOT NULL,
    city VARCHAR CHECK (length(city) <= 50) NOT NULL,
    num_bedroom NUMERIC NOT NULL,
    num_bathroom NUMERIC NOT NULL,
    is_laundry_available BOOLEAN NOT NULL,
    is_pet_allowed BOOLEAN NOT NULL,
    is_parking_available BOOLEAN NOT NULL,
    images TEXT ARRAY[10] NOT NULL,
    description VARCHAR CHECK (length(description) <= 5000) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES rentr_user(id)
);

INSERT INTO rentr_listing(userid, is_available, title, price, city, num_bedroom, num_bathroom, is_laundry_available, is_pet_allowed, is_parking_available, images, description) VALUES 
(1, TRUE, 'An appartment near the university', 500, 'Winnipeg', 3, 2, TRUE, TRUE, TRUE, ARRAY[]::TEXT[], 'This apartment near the university, also the bus stop. Only 2 mins walk to the bus stop, only thing is pet is not allowed.'),
(1, TRUE, 'Apartment along with Dalhousie Street!', 600, 'Winnipeg', 2, 2, TRUE, FALSE, TRUE, ARRAY[]::TEXT[], '- Next to University of Manitoba, Winnipeg, MB.
- Laundry Room included.
- (Single) Parking lot included
- Pets are NOT allowed.
- $600 Per month.

Welcome to leave a comment in the QnA Section if you have any question! 
'),
(1, TRUE, 'Apartment next to Polo Park!', 3000, 'Winnipeg', 2, 2, FALSE, FALSE, FALSE, ARRAY[]::TEXT[], 'Next to the Polo Park mall!');

CREATE TABLE IF NOT EXISTS rentr_chain (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    userid BIGINT NOT NULL, 
    listingid BIGINT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES rentr_user(id),
    CONSTRAINT fk_listing FOREIGN KEY (listingid) REFERENCES rentr_listing(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rentr_comment (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    userid BIGINT NOT NULL,
    listingid BIGINT NOT NULL,
    chainid BIGINT NOT NULL,
    comment VARCHAR CHECK (length(comment) <= 1000) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES rentr_user(id),
    CONSTRAINT fk_listing FOREIGN KEY (listingid) REFERENCES rentr_listing(id) ON DELETE CASCADE,
    CONSTRAINT fk_chain FOREIGN KEY (chainid) REFERENCES rentr_chain(id)
);
