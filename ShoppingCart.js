
/**
 * ShoppingCart class
 * Represents a shopping cart with various functionalities.
 */
class ShoppingCart {
  /**
   * Constructor function to initialize the shopping cart.
   */
  constructor() {
    this.items = []; // Array to store items in the cart
    this.discount = 0; // Initial discount amount is 0
  }

  /**
   * Adds an item to the shopping cart.
   * @param {Object} item - The item to be added, containing a name and price property.
   */
  addItem(item) {
    // Check if the item price is non-negative
    if (item.price >= 0) {
      this.items.push(item);
    } else {
      console.error('Item price cannot be negative');
    }
  }

  /**
   * Removes an item from the shopping cart.
   * @param {number|string} identifier - The index or name of the item to be removed.
   */
  removeItem(identifier) {
    // Check if the identifier is a number (index)
    if (typeof identifier === 'number') {
      // Check if the index is valid
      if (identifier >= 0 && identifier < this.items.length) {
        this.items.splice(identifier, 1);
      } else {
        console.error('Invalid index');
      }
    }
    // Check if the identifier is a string (name)
    else if (typeof identifier === 'string') {
      // Find the index of the item with the given name
      const index = this.items.findIndex(item => item.name === identifier);
      // Check if the item was found
      if (index !== -1) {
        this.items.splice(index, 1);
      } else {
        console.error('Item not found');
      }
    } else {
      console.error('Invalid identifier');
    }
  }

  /**
   * Calculates and returns the total price of all items in the cart after applying the discount.
   * @returns {number} The total price of all items in the cart after applying the discount.
   */
  getTotalPrice() {
    let totalPrice = 0;
    // Calculate the total price of all items
    for (const item of this.items) {
      totalPrice += item.price;
    }
    // Apply the discount and ensure the total price is non-negative
    return Math.max(0, (totalPrice - this.discount).toFixed(2));
  }

  /**
   * Applies a discount to the shopping cart.
   * @param {number} amount - The discount amount to be applied.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Displays the items in the shopping cart.
   */
  displayItems() {
    // Check if the cart is empty
    if (this.items.length === 0) {
      console.log('The cart is empty.');
    } else {
      console.log('Shopping Cart Items:');
      // Display each item with its index and price
      this.items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price}`);
      });
    }
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
   * @returns {Object|null} The item object if found, or null if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name) || null;
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
