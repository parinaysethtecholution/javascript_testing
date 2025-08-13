var Product = require('../models/Product');

// Create a new product
exports.createProduct = async function(req, res) {
  try {
    var name = req.body.name;
    var price = req.body.price;
    var imageLink = req.body.imageLink;

    var newProduct = new Product({ name: name, price: price, imageLink: imageLink });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProducts = async function(req, res) {
  try {
    var products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }
  parkCar(car) {
    if (this.availableCount === 0) return false;
    const emptySlot = this.slots.findIndex(slot => slot === null);
    this.slots[emptySlot] = car;
    this.availableCount--;
    return true;
  }
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car);
    if (slotIndex === -1) return false;
    this.slots[slotIndex] = null;
    this.availableCount++;
    return true;
  }
  getAvailableSlots() {
    return this.availableCount;
  }
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
