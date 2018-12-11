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
          console.log(" | " + res[i].item_id + " " + res[i].product_name + "............" + "$" + res[i].price + "\r\n");
      };
      console.log("-------------------------------------------------------");
      makeAPurchase();
    });
    
  };

//then prompt two messages -- ID of product to buy, how many units to buy
function makeAPurchase() {
    connection.query("SELECT * FROM products", function(err, res) { 
        
        inquirer
            .prompt(
                {
                name: "choice",
                type: "rawlist",
                choices: function(value) {
                    var choiceArray = [];
                    for (var i=0; i<res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
                message: "Which product number would you like to purchase?\n", 
        })
        .then(function(answer) {
            for (var i=0; i<res.length; i++) {

                if(res[i].item_id==answer.choice) {
                    var chosenItem = res[i];
                    inquirer
                        .prompt({
                            name: "unitsToBuy",
                            type: "input",
                            message: "How many units would you like to purchase?",
                            validate: function(value) {
                                if(isNaN(value)==false){
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        })
                        .then(function(answer) {
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

                            });
                        
                    };
                };
        

        // connection.end();    
    
            });
});

};