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



class Store {
    constructor(name) {
        this.name = name;
        this.inventory = {};
    }

    addItem(item, quantity) {
        if (this.inventory[item]) {
            this.inventory[item] += quantity;
        } else {
            this.inventory[item] = quantity;
        }
    }

    removeItem(item, quantity) {
        if (this.inventory[item] && this.inventory[item] >= quantity) {
            this.inventory[item] -= quantity;
            if (this.inventory[item] === 0) {
                delete this.inventory[item];
            }
            return true;
        } else {
            return false;
        }
    }

    getInventory() {
        return this.inventory;
    }
}

class Customer {
    constructor(name) {
        this.name = name;
        this.shoppingCart = {};
    }

    addToCart(store, item, quantity) {
        if (store.removeItem(item, quantity)) {
            if (this.shoppingCart[item]) {
                this.shoppingCart[item] += quantity;
            } else {
                this.shoppingCart[item] = quantity;
            }
            console.log(`${quantity} ${item}(s) added to cart.`);
        } else {
            console.log(`Sorry, ${item} is out of stock or insufficient quantity.`);
        }
    }

    removeFromCart(item, quantity) {
        if (this.shoppingCart[item] && this.shoppingCart[item] >= quantity) {
            this.shoppingCart[item] -= quantity;
            if (this.shoppingCart[item] === 0) {
                delete this.shoppingCart[item];
            }
            console.log(`${quantity} ${item}(s) removed from cart.`);
        } else {
            console.log(`Sorry, you don't have enough ${item}(s) in your cart.`);
        }
    }

    getCart() {
        return this.shoppingCart;
    }
}

class ShoppingMall {
    constructor(name) {
        this.name = name;
        this.stores = [];
        this.customers = [];
    }

    addStore(store) {
        this.stores.push(store);
    }

    addCustomer(customer) {
        this.customers.push(customer);
    }

    getStores() {
        return this.stores;
    }

    getCustomers() {
        return this.customers;
    }
}

const mall = new ShoppingMall('City Mall');

const store1 = new Store('Electronics Store');
store1.addItem('TV', 10);
store1.addItem('Laptop', 5);

const store2 = new Store('Clothing Store');
store2.addItem('Shirt', 20);
store2.addItem('Jeans', 15);

mall.addStore(store1);
mall.addStore(store2);

const customer1 = new Customer('Alice');
mall.addCustomer(customer1);

const customer2 = new Customer('Bob');
mall.addCustomer(customer2);

customer1.addToCart(store1, 'TV', 1);
customer1.addToCart(store2, 'Shirt', 2);

console.log(`${customer1.name}'s Cart:`, customer1.getCart());
console.log('Store1 Inventory:', store1.getInventory());
console.log('Store2 Inventory:', store2.getInventory());

customer1.removeFromCart('Shirt', 1);
console.log(`${customer1.name}'s Cart after removal:`, customer1.getCart());



