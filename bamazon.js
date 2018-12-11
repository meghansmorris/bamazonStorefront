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
      console.log("Bamazon products available for purchase: \n");

      for(var i=0; i<res.length; i++) {
          console.log(" | " + res[i].item_id + " " + res[i].product_name + "............" + "$" + res[i].price + "\r\n");
      }
      console.log("-------------------------------------------------------")
      makeAPurchase();
    });
    
  };

//then prompt two messages -- ID of product to buy, how many units to buy

function makeAPurchase() {

    inquirer
        .prompt([
            {
            name: "choice",
            type: "input",
            message: "Which product number would you like to purchase?\n",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                    return false;
            },  
        },
        {
            name: "unitsToBuy",
            type: "input",
            message: "How many units would you like?\n"
            }
        ])
        .then(function(answer) {
            var query = "SELECT item_id,product_name,price FROM products WHERE ?"; 
            connection.query(query, {item_id: answer.choice}, function(err, res) {
                var chosenItem;
                for (var i=0; i<res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        chosenItem = res[i];
                    }
                    console.log(chosenItem);
                }
            })

            //then check to see if there is enough product for the customer request
            if (chosenItem.stock_quantity < parseFloat(answer.unitsToBuy)) {
                var query = connection.query (
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            quantity: (parseFloat(chosenItem.stock_quantity - answer.unitsToBuy))
                        },
                        {
                            product_name: chosenItem
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + "has been updated!\n");
                        makeAPurchase();
                    } 
                );
                console.log(query.sql);

                //return error if not enough product
            } else {
                console.log(`There aren't enough ${chosenItem} available for purchase`);
                makeAPurchase();
            }

        })
    
    connection.end();
}


//if does, fullfill request and update database with remaining quantity and show the total cost of purchase


