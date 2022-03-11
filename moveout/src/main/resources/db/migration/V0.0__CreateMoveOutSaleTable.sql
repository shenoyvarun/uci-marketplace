DROP TABLE if exists move_out_sale.move_out_sale_table;
CREATE TABLE move_out_sale.move_out_sale_table(
    id INTEGER AUTO_INCREMENT,
    pname VARCHAR(100) NOT NULL,
    pcategory VARCHAR(100) NOT NULL,
    pcondition VARCHAR(100) NOT NULL,
    plocation VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)  
)
