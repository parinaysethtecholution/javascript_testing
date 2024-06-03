
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
   * Calculates and returns the total price of all items in the shopping cart after applying the discount.
   * @returns {number} The total price after applying the discount.
   */
  getTotalPrice() {
    let totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
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
   * Displays all items in the shopping cart with their respective indices and prices.
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
   * @returns {Object|undefined} The item object if found, otherwise undefined.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Checks if the shopping cart contains an item with the given name.
   * @param {string} name - The name of the item to check for.
   * @returns {boolean} True if the item is found in the shopping cart, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}
