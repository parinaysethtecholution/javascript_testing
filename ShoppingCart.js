
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    // Check if the index is valid before removing the item
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    // Iterate through the items and add their prices
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice - this.discount;
  }

  applyDiscount(amount) {
    this.discount = amount;
  }

  displayItems() {
    console.log('Shopping Cart Items:');
    // Iterate through the items and log their details
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $$${item.price}`);
    });
  }

  clearCart() {
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  getItemCount() {
    return this.items.length;
  }

  getItemByName(name) {
    // Find the item with the given name
    return this.items.find(item => item.name === name);
  }

  containsItem(name) {
    // Check if the cart contains an item with the given name
    return this.items.some(item => item.name === name);
  }
}

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
