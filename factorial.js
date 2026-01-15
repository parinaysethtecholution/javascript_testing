
function factorialIterative(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialIterative(5)); // Output: 120


function factorialRecursive(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // Output: 120




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
	@@ -43,6 +45,8 @@ class ShoppingCart {
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
	@@ -51,31 +55,37 @@ class ShoppingCart {
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
	@@ -122,4 +132,3 @@ console.log('Clearing cart...');
cart.clearCart();
cart.displayItems();
console.log('Total Price:', cart.getTotalPrice());
