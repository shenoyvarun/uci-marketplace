DROP TABLE IF EXISTS move_out_sale.product_table;
CREATE TABLE move_out_sale.product_table(
    id INTEGER AUTO_INCREMENT,
    prdname VARCHAR(100) NOT NULL,
    prdprice VARCHAR(100) NOT NULL,
    prdtype VARCHAR(100) NOT NULL,
    prdcondition VARCHAR(100) NOT NULL,
    prddec VARCHAR(300) NOT NULL,
    userid VARCHAR(100) NOT NULL,
    prdimage VARCHAR(300) NOT NULL,
    status INTEGER DEFAULT 1,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS move_out_sale.user_table;
CREATE TABLE move_out_sale.user_table
(
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    PRIMARY KEY(id)
);