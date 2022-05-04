CREATE TABLE IF NOT EXISTS move_out_sale.product_table(
    id INTEGER AUTO_INCREMENT,
    prd_name VARCHAR(100) NOT NULL,
    prd_price VARCHAR(100) NOT NULL,
    prd_type VARCHAR(100) NOT NULL,
    prd_condition VARCHAR(100) NOT NULL,
    prd_dec VARCHAR(300) NOT NULL,
    user_id INTEGER,
    image LONGBLOB,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS move_out_sale.user_table
(
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    PRIMARY KEY(id)
);