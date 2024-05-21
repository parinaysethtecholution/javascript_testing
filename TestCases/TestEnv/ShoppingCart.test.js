class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  addItem(item) { 
    this.items.push(item);
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error('Invalid index');
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
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
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
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
    return this.items.find(item => item.name === name);
  }

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




// ShoppingCart.test.js

const ShoppingCart = require('./ShoppingCart');
const Item = require('./Item');

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('addItem', () => {
    it('should add an item to the cart', () => {
      const item = new Item('Laptop', 1000);
      cart.addItem(item);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0]).toEqual(item);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      cart.removeItem(1);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0]).toEqual(item1);
    });

    it('should handle invalid index', () => {
      const item1 = new Item('Laptop', 1000);
      cart.addItem(item1);
      console.error = jest.fn();
      cart.removeItem(1);
      expect(console.error).toHaveBeenCalledWith('Invalid index');
    });
  });

  describe('getTotalPrice', () => {
    it('should calculate the total price', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      const item3 = new Item('Headphones', 100);
      cart.addItem(item1);
      cart.addItem(item2);
      cart.addItem(item3);
      expect(cart.getTotalPrice()).toBe(1900);
    });

    it('should apply the discount', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      const item3 = new Item('Headphones', 100);
      cart.addItem(item1);
      cart.addItem(item2);
      cart.addItem(item3);
      cart.applyDiscount(200);
      expect(cart.getTotalPrice()).toBe(1700);
    });
  });

  describe('displayItems', () => {
    it('should log the cart items', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      const item3 = new Item('Headphones', 100);
      cart.addItem(item1);
      cart.addItem(item2);
      cart.addItem(item3);
      console.log = jest.fn();
      cart.displayItems();
      expect(console.log).toHaveBeenCalledTimes(4);
    });
  });

  describe('clearCart', () => {
    it('should clear the cart', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      cart.clearCart();
      expect(cart.items.length).toBe(0);
      expect(cart.discount).toBe(0);
    });
  });

  describe('getItemCount', () => {
    it('should return the number of items in the cart', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      expect(cart.getItemCount()).toBe(2);
    });
  });

  describe('getItemByName', () => {
    it('should return the item with the given name', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      expect(cart.getItemByName('Laptop')).toEqual(item1);
    });
  });

  describe('containsItem', () => {
    it('should return true if the cart contains the item', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      expect(cart.containsItem('Phone')).toBe(true);
    });

    it('should return false if the cart does not contain the item', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      expect(cart.containsItem('Headphones')).toBe(false);
    });
  });
});
