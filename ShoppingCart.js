
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  // The addItem method has been removed and replaced with the removeItem method
  removeItem(index) {
    // Check if the index is valid (within the array bounds)
    if (index >= 0 && index < this.items.length) {
      // Remove the item at the specified index
      this.items.splice(index, 1);
    } else {
      // Log an error message if the index is invalid
      console.error('Invalid index');
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    // Iterate over each item in the cart
    for (const item of this.items) {
      // Add the price of the current item to the total price
      totalPrice += item.price;
    }
    // Return the total price after applying the discount
    return totalPrice - this.discount;
  }

  applyDiscount(amount) {
    // Set the discount amount
    this.discount = amount;
  }

  displayItems() {
    console.log('Shopping Cart Items:');
    // Iterate over each item in the cart and log its details
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }

  clearCart() {
    // Clear the items array and reset the discount
    this.items = [];
    this.discount = 0;
    console.log('Cart cleared.');
  }

  getItemCount() {
    // Return the number of items in the cart
    return this.items.length;
  }

  getItemByName(name) {
    // Find and return the first item with the specified name
    return this.items.find(item => item.name === name);
  }

  containsItem(name) {
    // Check if the cart contains an item with the specified name
    return this.items.some(item => item.name === name);
  }
}
