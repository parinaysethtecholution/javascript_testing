
/**
 * ShoppingCart class
 *
 * This class represents a shopping cart and provides methods to manage items in the cart,
 * apply discounts, display items, clear the cart, and perform other related operations.
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
   * Adds an item to the cart if the item price is non-negative.
   *
   * @param {Object} item - The item to be added to the cart.
   */
  addItem(item) {
    if (item.price >= 0) {
      this.items.push(item);
    } else {
      console.error('Item price cannot be negative');
    }
  }

  /**
   * Removes an item from the cart based on the provided identifier.
   *
   * @param {number|string} identifier - The index or name of the item to be removed.
   */
  removeItem(identifier) {
    if (typeof identifier === 'number') {
      // Remove item by index
      if (identifier >= 0 && identifier < this.items.length) {
        this.items.splice(identifier, 1);
      } else {
        console.error('Invalid index');
      }
    } else if (typeof identifier === 'string') {
      // Remove item by name
      const index = this.items.findIndex(item => item.name === identifier);
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
   * The total price is rounded to two decimal places and cannot be negative.
   *
   * @returns {number} The total price of items in the cart after applying the discount.
   */
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return Math.max(0, (totalPrice - this.discount).toFixed(2));
  }

  /**
   * Applies a discount to the cart.
   *
   * @param {number} amount - The discount amount to be applied.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Displays the items in the cart.
   * If the cart is empty, it logs a message indicating that the cart is empty.
   * Otherwise, it logs the list of items with their index and price.
   */
  displayItems() {
    if (this.items.length === 0) {
      console.log('The cart is empty.');
    } else {
      console.log('Shopping Cart Items:');
      this.items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price}`);
      });
    }
  }

  /**
   * Clears the cart by removing all items and resetting the discount to 0.
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  /**
   * Returns the number of items in the cart.
   *
   * @returns {number} The number of items in the cart.
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Retrieves an item from the cart by its name.
   *
   * @param {string} name - The name of the item to be retrieved.
   * @returns {Object|null} The item object if found, or null if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name) || null;
  }

  /**
   * Checks if the cart contains an item with the given name.
   *
   * @param {string} name - The name of the item to check for.
   * @returns {boolean} True if the item is found in the cart, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}
