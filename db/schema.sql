DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

-- burgers table creation
CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT ,
    burger_name VARCHAR(255) NOT NULL,
    devoured BOOLEAN,
    PRIMARY KEY(id)
);