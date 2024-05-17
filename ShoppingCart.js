
class ShoppingCart {
  constructor() {
    this.items = []; // Initialized the items array
    this.discount = 0; // Initialized the discount to 0
  }

  addItem(item) {
    this.items.push(item); // Added the item to the cart
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1); // Removed the item at the specified index
    } else {
      console.error('Invalid index'); // Handled the case of an invalid index
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price; // Calculated the total price of all items
    }
    return totalPrice - this.discount; // Subtracted the discount from the total price
  }

  applyDiscount(amount) {
    this.discount = amount; // Applied the discount to the cart
  }

  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $$${item.price}`); // Displayed the items in the cart
    });
  }

  clearCart() {
    this.items = []; // Cleared the cart
    this.discount = 0; // Reset the discount to 0
    console.log('Cart cleared.'); // Logged a message indicating that the cart has been cleared
  }

  getItemCount() {
    return this.items.length; // Returned the number of items in the cart
  }

  getItemByName(name) {
    return this.items.find(item => item.name === name); // Returned the item with the specified name
  }

  containsItem(name) {
    return this.items.some(item => item.name === name); // Checked if the cart contains an item with the specified name
  }
}

class Item {
  constructor(name, price) {
    this.name = name; // Initialized the name of the item
    this.price = price; // Initialized the price of the item
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
