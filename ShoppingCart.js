
/**
 * Shopping Cart Class
 * Represents a shopping cart with methods to manage items, calculate total price, and apply discounts.
 */
class ShoppingCart {
  /**
   * Constructor
   * Initializes the shopping cart with an empty array of items and a discount of 0.
   */
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  /**
   * Add Item
   * Adds a new item to the shopping cart.
   * @param {Object} item - The item to be added.
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Remove Item
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
   * Get Total Price
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
   * Apply Discount
   * Applies a discount to the shopping cart.
   * @param {number} amount - The discount amount to be applied.
   */
  applyDiscount(amount) {
    this.discount = amount;
  }

  /**
   * Display Items
   * Logs the items in the shopping cart to the console.
   */
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  /**
   * Clear Cart
   * Clears the shopping cart by removing all items and resetting the discount.
   */
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  /**
   * Get Item Count
   * Returns the number of items in the shopping cart.
   * @returns {number} The number of items in the shopping cart.
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Get Item By Name
   * Retrieves an item from the shopping cart based on its name.
   * @param {string} name - The name of the item to be retrieved.
   * @returns {Object|undefined} The item object if found, or undefined if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Contains Item
   * Checks if the shopping cart contains an item with the given name.
   * @param {string} name - The name of the item to check.
   * @returns {boolean} True if the item is found in the cart, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

/**
 * Item Class
 * Represents an item with a name and price.
 */
class Item {
  /**
   * Constructor
   * Initializes an item with a name and price.
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

const cartItems = [
  { name: "Item 1", price: 29.99, quantity: 1 },
  { name: "Item 2", price: 49.99, quantity: 2 },
  { name: "Item 3", price: 9.99, quantity: 5 }
];

/**
 * Calculate Total
 * Calculates the total value of the cart items based on their price and quantity.
 * @param {Array} cartItems - An array of cart items with name, price, and quantity properties.
 * @returns {string} The total value of the cart items, formatted as a string with two decimal places.
 */
function calculateTotal(cartItems) {
  let totalValue = 0;

  cartItems.forEach(item => {
    totalValue += item.price * item.quantity;
  });

  return totalValue.toFixed(2);
}

/**
 * Display Cart
 * Displays the cart items and total value on the webpage.
 * @param {Array} cartItems - An array of cart items with name, price, and quantity properties.
 */
function displayCart(cartItems) {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalValueSpan = document.getElementById("total-value");

  cartItemsDiv.innerHTML = "";
  cartItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    cartItemsDiv.appendChild(itemDiv);
  });

  const totalValue = calculateTotal(cartItems);
  totalValueSpan.textContent = totalValue;
}

displayCart(cartItems);
