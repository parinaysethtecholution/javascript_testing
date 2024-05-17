
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  addItem(item) {
    // Add the item to the shopping cart
    this.items.push(item);
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      // Remove the item at the specified index
      this.items.splice(index, 1);
    } else {
      // Log an error if the index is invalid
      console.error('Invalid index');
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    // Calculate the total price of all items in the cart
    for (const item of this.items) {
      totalPrice += item.price;
    }
    // Subtract the discount from the total price
    return totalPrice - this.discount;
  }

  applyDiscount(amount) {
    // Apply the discount to the shopping cart
    this.discount = amount;
  }

  displayItems() {
    console.log('Shopping Cart Items:');
    // Display the items in the shopping cart
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
    // Find the item in the cart by its name
    return this.items.find(item => item.name === name);
  }

  containsItem(name) {
    // Check if the cart contains an item with the given name
    return this.items.some(item => item.name === name);
  }
}

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
