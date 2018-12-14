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
            readProducts();
            break;

        case "View Low Inventory":
            //lowInventory();
            break;

        case "Add to Inventory":
            //addInventory();
            break;

        case "Add a New Product":
            newProduct();
            break;
      }
    });
};

//show items with an inventory less than 5
function lowInventory () {

}

//display a prompt to add more of any item currently for sale
function addInventory () {

}

//allow a completely new product to be added to the store
function newProduct () {
    inquirer.prompt([{
        name: "product_name",
        type: "input",
        message: "What is the name of the new product for sale?"
    },{
        name: "department_name",
        type: "input",
        message: "What department does the new product belong in?"
    },{
        name: "price",
        type: "input",
        message: "What is the price of the new product?",
        validate: function(value) {
            if(isNaN(value)==false){
                return true;
            } else {
                return false;
            }
        }
    },{
        name: "stock_quantity",
        type: "input",
        message: "What is the starting quantity of the new product?",
        validate: function(value) {
            if(isNaN(value)==false){
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer){
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: answer.price,
            stock_quantity: answer.stock_quantity
        }, function(err,res) {
            console.log(`\nYou have successfully added a product to bamazon!\n`);
            menuOptions();
        })
    })
}
