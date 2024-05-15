
/**
 * ShoppingCart class to manage items and calculate total price
 */
class ShoppingCart {
  /**
   * Constructor to initialize the cart
   */
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  /**
   * Add an item to the cart
   * @param {Item} item - The item to be added
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Remove an item from the cart by index
   * @param {number} index - The index of the item to be removed
   */
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  /**
   * Calculate the total price of all items in the cart after applying the discount
   * @returns {number} The total price
   */
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  /**
   * Apply a discount to the cart
   * @param {number} amount - The discount amount
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Display the items in the cart with their names and prices
   */
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  /**
   * Clear the cart by removing all items and resetting the discount
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  /**
   * Get the number of items in the cart
   * @returns {number} The number of items
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Get an item from the cart by its name
   * @param {string} name - The name of the item
   * @returns {Item|undefined} The item object if found, otherwise undefined
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Check if an item with the given name exists in the cart
   * @param {string} name - The name of the item
   * @returns {boolean} True if the item exists, false otherwise
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

/**
 * Item class to represent an item in the cart
 */
class Item {
  /**
   * Constructor to create an item
   * @param {string} name - The name of the item
   * @param {number} price - The price of the item
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
