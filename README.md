# bamazonStorefront

This CLI application is an Amazon-like storefront using MySQL and the Inquirer npm package. The application
takes orders from customers and depletes the stock quantity from the store's inventory. The application also has a manager view that allows the store manager to view low inventory levels, add new inventory and add new items to the store front. 

Here is a link to a video walk-through of the application: https://drive.google.com/file/d/1CRPEbrLbwl3BA9h0Hm6rEPtouA8KPWcW/view

In the customer view of the application a customer can choose an item to purchase from the storefront database. Built using Inquirer npm, I created a prompt application that asks the customer which item they would like to purchase and the quantity.  
![Image of Customer View 1](https://github.com/meghansmorris/bamazonStorefront/blob/master/images/Customer-1.png)

The MySQL database stores the list of items for sale and updates the inventory as items are purchased. Once the purchase is made, the application lets the customer know their purchase was successful and the total purchase amount.
![Image of Customer View 2](https://github.com/meghansmorris/bamazonStorefront/blob/master/images/Customer-2.jpg)

The application automatically reloads the storefront items for purchase with the updated inventory levels.
![Image of Customer View 3](https://github.com/meghansmorris/bamazonStorefront/blob/master/images/Customer-3.jpg)

In the manager view of the application a manager has a number of tools available to them. Created using the Inquirer npm package, this application gives the manager the option to view all products, see items with low inventory (programmed to 5 or less), add inventory to existing items or add a new product to the storefront.
![Image of Manager View 1](https://github.com/meghansmorris/bamazonStorefront/blob/master/images/Manager-1.jpg)

Within the tools, a number of new prompts will show up for the manager to answer. This screenshot shows the prompts within the "add inventory" option.
![Image of Manager View 2](https://github.com/meghansmorris/bamazonStorefront/blob/master/images/Manager-2.jpg)

This screenshot shows the prompts within the "add a new product" option.
![Image of Manager View 3](https://github.com/meghansmorris/bamazonStorefront/blob/master/images/Manager-3.jpg)

Once a new item is updated - either inventory amount or new item - it is saved in the MySQL database shown below and will load when the application is reopened.
![Image of MySQL Table Update](https://github.com/meghansmorris/bamazonStorefront/blob/master/images/MySQL-View.jpg)










