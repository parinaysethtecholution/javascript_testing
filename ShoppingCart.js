
class ShoppingCart {
  constructor() {
    this.items = []; // Array to store items in the shopping cart
    this.discount = 0; // Discount amount applied to the cart
  }

  /**
   * Removes an item from the shopping cart based on the provided index.
   * @param {number} index - The index of the item to be removed.
   */
  removeItem(index) {
    // Check if the index is valid
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1); // Remove the item at the specified index
    } else {
      console.error('Invalid index'); // Log an error if the index is invalid
    }
  }

  /**
   * Calculates and returns the total price of all items in the shopping cart after applying the discount.
   * @returns {number} The total price after applying the discount.
   */
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price; // Add the price of each item to the total
    }
    return totalPrice - this.discount; // Return the total price after subtracting the discount
  }

  /**
   * Applies a discount to the shopping cart.
   * @param {number} amount - The discount amount to be applied.
   */
  applyDiscount(amount) {
    this.discount = amount; // Set the discount amount
  }

  /**
   * Displays the items in the shopping cart along with their index and price.
   */
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`); // Log the item details
    });
  }

  /**
   * Clears the shopping cart by removing all items and resetting the discount.
   */
  clearCart() {
    this.items = []; // Clear the items array
    this.discount = 0; // Reset the discount to 0
    console.log('Cart cleared.'); // Log a message indicating that the cart has been cleared
  }

  /**
   * Returns the number of items in the shopping cart.
   * @returns {number} The number of items in the shopping cart.
   */
  getItemCount() {
    return this.items.length; // Return the length of the items array
  }

  /**
   * Finds and returns the first item in the shopping cart with the specified name.
   * @param {string} name - The name of the item to search for.
   * @returns {Object|undefined} The item object if found, or undefined if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name); // Find and return the item with the specified name
  }

  /**
   * Checks if the shopping cart contains an item with the specified name.
   * @param {string} name - The name of the item to search for.
   * @returns {boolean} True if the item is found in the cart, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name); // Check if any item in the cart has the specified name
  }
}
