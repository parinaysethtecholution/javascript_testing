
function factorialRecursive(n) {
  // Base case: If n is 0 or 1, return 1
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive case: Calculate n! by multiplying n with (n-1)!
  return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // Output: 120

class ShoppingCart {
  constructor() {
    this.items = []; // Initialize the items array
    this.discount = 0; // Initialize the discount amount
  }

  // Add an item to the shopping cart
  addItem(item) {
    this.items.push(item);
  }

  // Remove an item from the shopping cart by index
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  // Calculate the total price of the items in the cart, considering the discount
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  // Apply a discount to the shopping cart
  applyDiscount(amount) {
    this.discount = amount;
  }

  // Display the items in the shopping cart
  displayItems() {
    console.log('Shopping Cart Items:');
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $$${item.price}`);
    });
  }

  // Clear the shopping cart
  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  // Get the number of items in the shopping cart
  getItemCount() {
    return this.items.length;
  }

  // Get an item from the shopping cart by name
  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  // Check if an item is in the shopping cart
  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}

class Item {
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

class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null); // Initialize the parking slots
    this.availableCount = size; // Initialize the available slot count
  }

  // Park a car in the parking lot
  parkCar(car) {
    if (this.availableCount === 0) return false; // If the lot is full, return false
    const emptySlot = this.slots.findIndex(slot => slot === null); // Find the first available slot
    this.slots[emptySlot] = car; // Park the car in the available slot
    this.availableCount--; // Decrement the available slot count
    return true;
  }

  // Remove a car from the parking lot
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car); // Find the slot index of the car
    if (slotIndex === -1) return false; // If the car is not found, return false
    this.slots[slotIndex] = null; // Remove the car from the slot
    this.availableCount++; // Increment the available slot count
    return true;
  }

  // Get the number of available slots in the parking lot
  getAvailableSlots() {
    return this.availableCount;
  }

  // Check if the parking lot is full
  isFull() {
    return this.availableCount === 0;
  }
}

// Example usage
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // 8
console.log(lot.removeCar("TRUCK789")); // true
console.log(lot.isFull()); // false
