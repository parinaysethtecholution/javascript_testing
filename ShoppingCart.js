
// ShoppingCart.js

/**
 * ShoppingCart class represents a shopping cart for an e-commerce application.
 * It allows adding, removing, and managing items in the cart, as well as applying discounts
 * and calculating the total price.
 */
class ShoppingCart {
  /**
   * Constructor initializes an empty array for items and sets the discount to 0.
   */
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  /**
   * Adds a new item to the shopping cart.
   * @param {Object} item - The item to be added to the cart.
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Removes an item from the shopping cart based on the provided index.
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
   * Calculates and returns the total price of all items in the cart after applying the discount.
   * @returns {number} The total price of all items in the cart after applying the discount.
   */
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  /**
   * Applies a discount to the shopping cart.
   * @param {number} amount - The discount amount to be applied.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Displays all items in the shopping cart with their respective index and price.
   */
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  /**
   * Clears the shopping cart by removing all items and resetting the discount.
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  /**
   * Returns the number of items in the shopping cart.
   * @returns {number} The number of items in the shopping cart.
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Retrieves an item from the shopping cart based on its name.
   * @param {string} name - The name of the item to be retrieved.
   * @returns {Object|undefined} The item object if found, or undefined if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Checks if the shopping cart contains an item with the given name.
   * @param {string} name - The name of the item to check for.
   * @returns {boolean} True if the item is found in the cart, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

// Usage example:
const cart = new ShoppingCart();
cart.addItem({ name: 'Product A', price: 10 });
cart.addItem({ name: 'Product B', price: 20 });
cart.applyDiscount(5);
console.log('Total Price:', cart.getTotalPrice()); // Output: Total Price: 25
cart.displayItems();
/*
Shopping Cart Items:
1. Product A - $10
2. Product B - $20
*/
