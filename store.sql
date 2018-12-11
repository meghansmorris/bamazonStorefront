DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100), 
    price DECIMAL(10, 2),
    stock_quantity INTEGER(12) NOT NULL,
    PRIMARY KEY(item_id)
	);  

SELECT * FROM products;