
// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  // Add an item to the cart
  addItem(item) {
    this.items.push(item);
  }

  // Remove an item from the cart by index
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  // Calculate the total price of all items in the cart
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  // Apply a discount to the total price
  applyDiscount(amount) {
    this.discount = amount;
  }

  // Display all items in the cart
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  // Clear the cart and reset the discount
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  // Get the number of items in the cart
  getItemCount() {
    return this.items.length;
  }

  // Get an item by its name
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  // Check if an item with the given name is in the cart
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

// Item class
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
