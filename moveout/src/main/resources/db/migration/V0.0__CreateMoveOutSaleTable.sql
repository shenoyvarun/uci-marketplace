DROP TABLE if exists move_out_sale.move_out_sale_table;
CREATE TABLE move_out_sale.move_out_sale_table(
    id INTEGER AUTO_INCREMENT,
    p_name VARCHAR(100) NOT NULL,
    p_category VARCHAR(100) NOT NULL,
    p_condition VARCHAR(100) NOT NULL,
    p_location VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
)
