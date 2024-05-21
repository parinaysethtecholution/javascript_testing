
// ShoppingCart.test.js

const ShoppingCart = require('./ShoppingCart');
const Item = require('./ShoppingCart');

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('addItem', () => {
    it('should add an item to the cart', () => {
      const item = new Item('Laptop', 1000);
      cart.addItem(item);
      expect(cart.getItemCount()).toBe(1);
      expect(cart.containsItem('Laptop')).toBe(true);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      cart.removeItem(1);
      expect(cart.getItemCount()).toBe(1);
      expect(cart.containsItem('Phone')).toBe(true);
      expect(cart.containsItem('Laptop')).toBe(false);
    });

    it('should handle invalid index', () => {
      const item = new Item('Laptop', 1000);
      cart.addItem(item);
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
      cart.addItem(item1);
      cart.addItem(item2);
      cart.applyDiscount(200);
      expect(cart.getTotalPrice()).toBe(1600);
    });
  });

  describe('clearCart', () => {
    it('should clear the cart', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      cart.clearCart();
      expect(cart.getItemCount()).toBe(0);
      expect(cart.getTotalPrice()).toBe(0);
    });
  });

  describe('getItemByName', () => {
    it('should return the item by name', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      cart.addItem(item2);
      const foundItem = cart.getItemByName('Laptop');
      expect(foundItem).toEqual(item1);
    });
  });

  describe('containsItem', () => {
    it('should check if the cart contains an item', () => {
      const item1 = new Item('Laptop', 1000);
      const item2 = new Item('Phone', 800);
      cart.addItem(item1);
      expect(cart.containsItem('Laptop')).toBe(true);
      expect(cart.containsItem('Phone')).toBe(false);
    });
  });
});
