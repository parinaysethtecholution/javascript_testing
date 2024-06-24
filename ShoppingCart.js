
/**
 * ShoppingCart class
 * Represents a shopping cart with functionality to add, remove, and manage items.
 */
class ShoppingCart {
  /**
   * Constructor
   * Initializes an empty array to store items and sets the initial discount to 0.
   */
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  /**
   * Adds an item to the shopping cart.
   * @param {Object} item - The item to be added.
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Removes an item from the shopping cart based on its index.
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
   * Calculates and returns the total price of all items in the shopping cart after applying the discount.
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
   * Applies a discount to the shopping cart.
   * @param {number} amount - The discount amount.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Displays all items in the shopping cart with their index, name, and price.
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
   * Retrieves an item from the shopping cart by its name.
   * @param {string} name - The name of the item to be retrieved.
   * @returns {Object|undefined} The item object if found, or undefined if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Checks if an item with the given name exists in the shopping cart.
   * @param {string} name - The name of the item to check.
   * @returns {boolean} True if the item exists, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}
