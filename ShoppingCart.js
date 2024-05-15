
class ShoppingCart {
  /**
   * Constructor to initialize the shopping cart.
   */
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  /**
   * Add an item to the shopping cart.
   * @param {Object} item - The item to be added.
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Remove an item from the shopping cart by index.
   * @param {number} index - The index of the item to be removed.
   */
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  /**
   * Calculate the total price of all items in the shopping cart.
   * @returns {number} The total price after applying the discount.
   */
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  /**
   * Apply a discount to the shopping cart.
   * @param {number} amount - The discount amount.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Display all items in the shopping cart.
   */
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  /**
   * Clear the shopping cart by removing all items and resetting the discount.
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  /**
   * Get the total number of items in the shopping cart.
   * @returns {number} The number of items in the cart.
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Get an item from the shopping cart by its name.
   * @param {string} name - The name of the item to retrieve.
   * @returns {Object|undefined} The item object if found, or undefined if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Check if the shopping cart contains an item with the given name.
   * @param {string} name - The name of the item to check.
   * @returns {boolean} True if the item is found, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

class Item {
  /**
   * Constructor to create an item.
   * @param {string} name - The name of the item.
   * @param {number} price - The price of the item.
   */
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
