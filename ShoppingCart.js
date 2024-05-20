class ShoppingCart {
  /**
   * Constructs a new ShoppingCart instance.
   */
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  /**
   * Adds an item to the shopping cart.
   * @param {Item} item - The item to add to the cart.
   */
  addItem(item) { 
    this.items.push(item);
  }

  /**
   * Removes an item from the shopping cart by index.
   * @param {number} index - The index of the item to remove.
   */
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  /**
   * Calculates the total price of all items in the cart after discount.
   * @returns {number} The total price.
   */
  getTotalPrice() {
    let totalPrice = this.items.reduce((total, item) => total + item.price, 0);
    return totalPrice - this.discount;
  }

  /**
   * Applies a discount to the shopping cart.
   * @param {number} amount - The discount amount to apply.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Displays all items in the shopping cart.
   */
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  /**
   * Clears all items from the shopping cart and resets the discount.
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  /**
   * Gets the count of items in the shopping cart.
   * @returns {number} The number of items.
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Retrieves an item from the shopping cart by name.
   * @param {string} name - The name of the item to find.
   * @returns {Item|undefined} The found item or undefined if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Checks if the shopping cart contains an item with the specified name.
   * @param {string} name - The name of the item to check.
   * @returns {boolean} True if the item is in the cart, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

class Item {
  /**
   * Constructs a new Item instance.
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