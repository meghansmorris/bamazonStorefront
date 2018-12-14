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
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      //console.log(res);
      console.log("Bamazon products available for purchase:\n");

      for(var i=0; i<res.length; i++) {
          console.log(" | " + res[i].item_id + " " + res[i].product_name + "............" + "$" + res[i].price + "   Units Available: " + res[i].stock_quantity + "\r\n");
      };
      console.log("-------------------------------------------------------");
      
      menuOptions();
    });
    
  };

function menuOptions () {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add a New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
            //function;
            break;

        case "View Low Inventory":
            //function;
            break;

        case "Add to Inventory":
            //function;
            break;

        case "Add a New Product":
            //function;
            break;
      }
    });
}