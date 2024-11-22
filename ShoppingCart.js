class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  addItem(item) {
    if (item.price >= 0) {
      this.items.push(item);
    } else {
      console.error('Item price cannot be negative');
    }
  }

  removeItem(identifier) {
    if (typeof identifier === 'number') {
      if (identifier >= 0 && identifier < this.items.length) {
        this.items.splice(identifier, 1);
      } else {
        console.error('Invalid index');
      }
    } else if (typeof identifier === 'string') {
      const index = this.items.findIndex(item => item.name === identifier);
      if (index !== -1) {
        this.items.splice(index, 1);
      } else {
        console.error('Item not found');
      }
    } else {
      console.error('Invalid identifier');
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return Math.max(0, (totalPrice - this.discount).toFixed(2));
  }

  applyDiscount(amount) {
    this.discount = amount;
  }

  displayItems() {
    if (this.items.length === 0) {
      console.log('The cart is empty.');
    } else {
      console.log('Shopping Cart Items:');
      this.items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price}`);
      });
    }
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
    return this.items.find(item => item.name === name) || null;
  }

  containsItem(name) {
    return this.items.some(item => item.name === name);
  }
}
