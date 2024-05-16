
// Refactored code with improved readability and maintainability

// Import the Product model
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { name, price, imageLink } = req.body;

    // Create a new product instance
    const newProduct = new Product({ name, price, imageLink });

    // Save the new product to the database
    await newProduct.save();

    // Return a success response with the created product
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    // Log the error and return a server error response
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ParkingLot class to manage parking slots
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null); // Initialize slots with null
    this.availableCount = size; // Track available slots
  }
  parkCar(car) {
    if (this.availableCount === 0) return false; // If no slots available, return false
    const emptySlot = this.slots.findIndex(slot => slot === null); // Find first empty slot
    this.slots[emptySlot] = car; // Park the car in the empty slot
    this.availableCount--; // Decrease available slots count
    return true; // Return true if parking successful
  }
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car); // Find the car in slots
    if (slotIndex === -1) return false; // If car not found, return false
    this.slots[slotIndex] = null; // Remove the car from the slot
    this.availableCount++; // Increase available slots count
    return true; // Return true if removal successful
  }
  getAvailableSlots() {
    return this.availableCount; // Return count of available slots
  }
  isFull() {
    return this.availableCount === 0; // Return true if parking lot is full
  }
}

// Example usage
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // 8
console.log(lot.removeCar("TRUCK789")); // true
console.log(lot.isFull()); // false

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Return the list of products
    res.json(products);
  } catch (error) {
    // Log the error and return a server error response
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
