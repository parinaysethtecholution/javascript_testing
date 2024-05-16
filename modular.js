
export function returnWeatherDetails(object) {
  // Iterate through the object and create an array of key-value pairs
  let arr = [];
  for (let key in object) {
    if (object[key] && object[key] !== 0) {
      arr.push({
        key: key,
        value: object[key]
      });
    }
  }
  return arr;
}

class ShoppingCart {
  constructor() {
    // Initialize the shopping cart with an empty array of items and a discount of 0
    this.items = [];
    this.discount = 0;
  }

  addItem(item) {
    // Add an item to the shopping cart
    this.items.push(item);
  }

  removeItem(index) {
    // Remove an item from the shopping cart by index
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  getTotalPrice() {
    // Calculate the total price of the items in the shopping cart, subtracting the discount
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  applyDiscount(amount) {
    // Apply a discount to the shopping cart
    this.discount = amount;
  }

  displayItems() {
    // Display the items in the shopping cart
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $$${item.price}`);
    });
  }

  clearCart() {
    // Clear the shopping cart
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  getItemCount() {
    // Get the number of items in the shopping cart
    return this.items.length;
  }

  getItemByName(name) {
    // Get an item in the shopping cart by its name
    return this.items.find(item => item.name === name);
  }

  containsItem(name) {
    // Check if the shopping cart contains an item with a specific name
    return this.items.some(item => item.name === name);
  }
}

class Item {
  constructor(name, price) {
    // Initialize an item with a name and price
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
