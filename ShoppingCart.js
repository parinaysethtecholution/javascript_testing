
// ShoppingCart.js

/**
 * ShoppingCart class to manage items in a shopping cart.
 */
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
   * Remove an item from the shopping cart.
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
   * Calculate the total price of all items in the shopping cart after applying the discount.
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
   * Display all items in the shopping cart with their index, name, and price.
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
   * Get the number of items in the shopping cart.
   * @returns {number} The number of items in the shopping cart.
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Get an item from the shopping cart by its name.
   * @param {string} name - The name of the item to be retrieved.
   * @returns {Object|undefined} The item object if found, otherwise undefined.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Check if an item with the given name exists in the shopping cart.
   * @param {string} name - The name of the item to be checked.
   * @returns {boolean} True if the item exists, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

// Usage example
const cart = new ShoppingCart();
cart.addItem({ name: 'Shirt', price: 25 });
cart.addItem({ name: 'Pants', price: 35 });
cart.applyDiscount(10);
console.log(`Total price: $${cart.getTotalPrice()}`);
cart.displayItems();
