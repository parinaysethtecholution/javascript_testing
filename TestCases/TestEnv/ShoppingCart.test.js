
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
