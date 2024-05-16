
var express = require('express');
var cors = require('cors');
var axios = require('axios');
require('dotenv').config();

var app = express();

app.use(cors());
app.use(express.json());

var apiEndpoint = '/api/endpoint';

app.post('/api', function(req, res) {
  try {
    var apiKey = process.env.API_KEY;
    axios.post(apiEndpoint, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
    }).then(function(response) {
      res.json(response.data);
    }).catch(function(error) {
      res.status(500).json({ error: 'Internal Server Error' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/news', function(req, res) {
  try {
    var newsApiKey = process.env.NEWS_API_KEY;
    var q = req.query.q;
    var from = req.query.from;
    axios.get('https://sample/api' + q + '&from=' + from + '&sortBy=publishedAt&apiKey=' + newsApiKey)
      .then(function(apiResponse) {
        res.json(apiResponse.data);
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

var PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log('Server is running on http://localhost:' + PORT);
});

// Refactored 'Changed Part'
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  // Add an item to the shopping cart
  addItem(item) {
    this.items.push(item);
  }

  // Remove an item from the shopping cart by index
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  // Calculate the total price of the items in the cart, considering the discount
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  // Apply a discount to the shopping cart
  applyDiscount(amount) {
    this.discount = amount;
  }

  // Display the items in the shopping cart
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $$${item.price}`);
    });
  }

  // Clear the shopping cart
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  // Get the number of items in the shopping cart
  getItemCount() {
    return this.items.length;
  }

  // Get an item from the shopping cart by name
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  // Check if an item is in the shopping cart
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

// Item class to represent a product in the shopping cart
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Example usage
const cart = new ShoppingCart();

const item1 = new Item('Laptop', 1000);
const item2 = new Item('Phone', 800);
const item3 = new Item('Headphones', 100);

cart.addItem(item1);
cart.addItem(item2);
cart.addItem(item3);

cart.displayItems();
console.log('Total Price:', cart.getTotalPrice());

console.log('Applying discount of $200...');
cart.applyDiscount(200);
console.log('Total Price (after discount):', cart.getTotalPrice());

console.log('Removing item at index 1...');
cart.removeItem(1);
cart.displayItems();
console.log('Total Price:', cart.getTotalPrice());

console.log('Total number of items in the cart:', cart.getItemCount());

console.log('Getting item by name:');
console.log(cart.getItemByName('Laptop'));

console.log('Is "Phone" in the cart?', cart.containsItem('Phone'));

console.log('Clearing cart...');
cart.clearCart();
cart.displayItems();
console.log('Total Price:', cart.getTotalPrice());
