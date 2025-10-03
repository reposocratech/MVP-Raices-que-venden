drop DATABASE almuyalma;
CREATE DATABASE almuyalma;
USE almuyalma;
-- DROP DATABASE almuyalma;

CREATE TABLE user (
    user_id INT UNSIGNED NOT NULL  PRIMARY KEY,
    user_name VARCHAR(55),
    last_name VARCHAR(100),
    nif_cif VARCHAR(20),
    type TINYINT NOT NULL DEFAULT 2,  -- 1 - admin  |  2 - user
    email VARCHAR(100)  NOT NULL UNIQUE,
    user_description VARCHAR(255),    
    company_name VARCHAR(100),
    address VARCHAR(100),
    province VARCHAR(100),
    city VARCHAR(200),
    phone_number VARCHAR(20),
    password VARCHAR(200) NOT NULL,
    avatar VARCHAR(200),
	is_validated BOOLEAN NOT NULL DEFAULT 0,
    is_deactivated BOOLEAN NOT NULL DEFAULT 0,
    register_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM user;

create table social_network(
	social_network_id INT UNSIGNED PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    name VARCHAR(20) NOT NULL,
    link VARCHAR(300) NOT NULL,
    CONSTRAINT fk_user_6 FOREIGN KEY (user_id)
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
    
CREATE TABLE service ( 
    service_id SMALLINT UNSIGNED NOT NULL PRIMARY KEY, -- let id = select max(service_id) from service; id++; insert into servics.... (id)
    service_name VARCHAR(55) NOT NULL,
    service_description VARCHAR(500) NOT NULL,
    service_image VARCHAR(200) NOT NULL, -- OJO!!! si son varias imágenes habrá que crear una tabla!!!
    service_price DECIMAL(7,2), -- 9.999,99
    is_visible BOOLEAN NOT NULL DEFAULT 0
);



CREATE TABLE availability (
    availability_id MEDIUMINT UNSIGNED NOT NULL auto_increment PRIMARY KEY,
    availability_day TINYINT NOT NULL, -- de 1 a 5 para de lunes a viernes
    availability_hour TINYINT UNSIGNED  NOT NULL -- "08:00 - 09:00" de 1 a 12, para 8 am y 8 pm
);

    
CREATE TABLE appointment (
    appointment_2_id BIGINT UNSIGNED NOT NULL auto_increment PRIMARY KEY,
    app_status TINYINT UNSIGNED NOT NULL DEFAULT 1, -- 1 pendiente | 2 confirmado | 3 cancelado
    app_day TINYINT UNSIGNED NOT NULL, -- de 1 a 5 para de lunes a viernes
    app_hour TINYINT UNSIGNED NOT NULL,  -- "08:00 - 09:00" de 1 a 12, para 8 am y 8 pm
    app_date DATE NOT NULL, -- 23/09/2025
    user_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_user_1 FOREIGN KEY (user_id)
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
    
CREATE TABLE text (
    text_id INT UNSIGNED NOT NULL auto_increment PRIMARY KEY,
    text_title VARCHAR(100) NOT NULL,
    text_body MEDIUMTEXT,
    text_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    text_status TINYINT UNSIGNED NOT NULL DEFAULT 1,
    filename VARCHAR(200),
    user_id INT UNSIGNED NOT NULL,
    last_modified DATETIME NULL,
    CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Tablas si nos diese tiempo

CREATE TABLE message (
	message_id BIGINT UNSIGNED NOT NULL auto_increment PRIMARY KEY,
	message_text VARCHAR(300) NOT NULL,
	sender_user_id  INT UNSIGNED NOT NULL,
	recipient_user_id INT UNSIGNED NOT NULL,
	message_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_user_3 FOREIGN KEY (sender_user_id)
	REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_4 FOREIGN KEY (recipient_user_id)
	REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


 CREATE TABLE category (
	category_id MEDIUMINT UNSIGNED NOT NULL auto_increment PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);



CREATE TABLE product (
   product_id INT UNSIGNED NOT NULL auto_increment PRIMARY KEY,
   product_name VARCHAR(100) NOT NULL,
   is_public BOOLEAN NOT NULL DEFAULT 0,
   product_description VARCHAR(300) NOT NULL,
   product_price DECIMAL(6,2) NOT NULL, -- 9.999,99
   product_image VARCHAR(100),
   category_id MEDIUMINT UNSIGNED NOT NULL, 
   CONSTRAINT fk_category_1 FOREIGN KEY (category_id)
   REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE purchase (
    purchase_id BIGINT UNSIGNED NOT NULL auto_increment PRIMARY KEY,
    purchase_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_user_5 FOREIGN KEY (user_id)
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_1 FOREIGN KEY (product_id)
    REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE CASCADE    
);