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
('bosco@gmail.com', '$2b$10$VcG9Jd24EM.wOH6EIBXY5uKvuV7wOr7wyqIilOOil/uJCUvQTIxKG'),
('justin@gmail.com', '$2b$10$VcG9Jd24EM.wOH6EIBXY5uKvuV7wOr7wyqIilOOil/uJCUvQTIxKG'),
('ronnie@gmail.com', '$2b$10$VcG9Jd24EM.wOH6EIBXY5uKvuV7wOr7wyqIilOOil/uJCUvQTIxKG'),
('azizul@gmail.com', '$2b$10$VcG9Jd24EM.wOH6EIBXY5uKvuV7wOr7wyqIilOOil/uJCUvQTIxKG'),
('nathan@gmail.com', '$2b$10$VcG9Jd24EM.wOH6EIBXY5uKvuV7wOr7wyqIilOOil/uJCUvQTIxKG');

SELECT * FROM rentr_user;

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
(1, TRUE, 'Expensive one', 1000000, 'Winnipeg', 10, 5, TRUE, TRUE, TRUE, ARRAY['image_url1.com', 'image_url2.com', 'image_url3.com'], 'one million dollars'),
(1, FALSE, 'An appartment with full of bathroom', 10, 'Brandon', 1, 10, FALSE, TRUE, FALSE, ARRAY[]::TEXT[], 'Smells Good.'),
(2, TRUE, 'Serious appartment', 320, 'Winnipeg', 3, 2, TRUE, TRUE, FALSE, ARRAY['this_is_the_image_url.com'], 'An appartment closed to the university and the bus stop. Contact me!');

SELECT * FROM rentr_listing;

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

INSERT INTO rentr_chain(userid, listingid) VALUES
(3, 1),
(2, 1),
(4, 2);

INSERT INTO rentr_comment(userid, listingid, chainid, comment) VALUES
(3, 1, 1, 'Tenant (uid=3) | Comment 1 in Chain 1 in Listing 1'),
(1, 1, 1, 'Landlord (uid=1) | Comment 2 in Chain 1 in Listing 1'),
(3, 1, 1, 'Tenant (uid=3) | Comment 3 in Chain 1 in Listing 1'),
(2, 1, 1, 'Another Tenant (uid=2) | Comment 4 in Chain 1 in Listing 1'),
(2, 1, 2, 'Tenant (uid=2) | Comment 5 in Chain 2 in Listing 1'),
(1, 1, 2, 'Landlord (uid=1) | Comment 6 in Chain 2 in Listing 1'),
(1, 1, 2, 'Landlord (uid=1) | Comment 7 in Chain 2 in Listing 1'),
(1, 1, 2, 'Landlord (uid=1) | Comment 8 in Chain 2 in Listing 1'),
(4, 2, 3, 'Tenant (uid=4) | Comment 9 in Chain 3 in Listing 2');

SELECT * FROM rentr_chain;

SELECT * FROM rentr_comment;
