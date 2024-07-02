
// ShoppingCart.js

/**
 * ShoppingCart class represents a shopping cart for an e-commerce application.
 * It provides methods to add, remove, and manage items in the cart, calculate
 * the total price, apply discounts, and display cart items.
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
   * Adds an item to the cart.
   * @param {Object} item - The item to be added to the cart.
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Removes an item from the cart based on its index.
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
   * Applies a discount to the cart.
   * @param {number} amount - The discount amount to be applied.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Displays all items in the cart with their index, name, and price.
   */
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  /**
   * Clears the cart by removing all items and resetting the discount.
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  /**
   * Returns the number of items in the cart.
   * @returns {number} The number of items in the cart.
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Finds and returns the first item in the cart with the given name.
   * @param {string} name - The name of the item to find.
   * @returns {Object|undefined} The item object if found, otherwise undefined.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Checks if the cart contains an item with the given name.
   * @param {string} name - The name of the item to check.
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
