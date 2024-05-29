
/**
 * Class representing a shopping cart.
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
   * Adds an item to the shopping cart.
   * @param {Object} item - The item to be added.
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
   * Calculates and returns the total price of all items in the shopping cart after applying the discount.
   * @returns {number} The total price after applying the discount.
   */
  getTotalPrice() {
    const totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
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
   * @param {string} name - The name of the item to retrieve.
   * @returns {Object|undefined} The item object if found, or undefined if not found.
   */
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  /**
   * Checks if an item with the given name exists in the shopping cart.
   * @param {string} name - The name of the item to check.
   * @returns {boolean} True if the item exists in the cart, false otherwise.
   */
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

/**
 * Class representing an item.
 */
class Item {
  /**
   * Constructor to initialize an item.
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

// Example array of cart items
const cartItems = [
  { name: "Item 1", price: 29.99, quantity: 1 },
  { name: "Item 2", price: 49.99, quantity: 2 },
  { name: "Item 3", price: 9.99, quantity: 5 }
];

/**
 * Calculates the total value of the cart items.
 * @param {Array} cartItems - An array of cart items.
 * @returns {string} The total value of the cart items as a string with 2 decimal places.
 */
function calculateTotal(cartItems) {
  const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return totalValue.toFixed(2);
}

/**
 * Displays the cart items and total value on the page.
 * @param {Array} cartItems - An array of cart items.
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

// Initialize the cart display
displayCart(cartItems);
