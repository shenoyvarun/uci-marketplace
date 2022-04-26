DROP TABLE if exists move_out_sale.move_out_sale_table;
CREATE TABLE move_out_sale.move_out_sale_table(
    id INTEGER AUTO_INCREMENT,
    prdName VARCHAR(100) NOT NULL,
    prdPrice VARCHAR(100) NOT NULL,
    prdType VARCHAR(100) NOT NULL,
    prdCondition VARCHAR(100) NOT NULL,
    prdDec VARCHAR(300) NOT NULL,
    userID INTEGER NOT NULL,
    image LONGBLOB,
    PRIMARY KEY(id)
);
DROP TABLE if exists move_out_sale.user_table;
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