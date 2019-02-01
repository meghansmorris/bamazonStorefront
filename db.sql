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
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ficus", "Gardening", 10.00, 5), ("Garden Gnome", "Gardening", 24.99, 25),
("Lucky Bamboo", "Gardening", 49.99, 45), 
("Grumpy Cat 2019 Calendar", "Office Supplies", 13.50, 100), 
("Set of 10 Purple Pens", "Office Supplies", 5.99, 450), 
("Slinky", "Toys", 12.99, 167), ("Troll Doll", "Toys", 8.00, 48), 
("Cat Lover Socks", "Gifts", 14.50, 575), ("Ukele", "Musical Instruments", 175.00, 12), 
("Accordian", "Musical Instruments", 299.99, 3), ("Roomba Vacuum", "Gifts", 199.99, 134), 
("Yoga Mat", "Gifts", 80.00, 375);

SELECT * FROM products;




