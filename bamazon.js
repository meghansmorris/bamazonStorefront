var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",

  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  readProducts();
});

//display all items for sale on bamazon
function readProducts() {
    console.log("Bamazon products available...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }
//then prompt two messages -- ID of product to buy, how many units to buy
//then check to see if there is enough product for the customer request
//return error if not
//if does, fullfill request and update database with remaining quantity and show the total cost of purchase
  //icecreamCRUD has the remove item function