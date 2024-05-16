
// Create a new product
exports.createProduct = async function(req, res) {
  try {
    // Extract product details from the request body
    const { name, price, imageLink } = req.body;

    // Create a new product instance
    const newProduct = new Product({ name, price, imageLink });

    // Save the new product
    await newProduct.save();

    // Send a success response
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    // Log the error and send a server error response
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
exports.getAllProducts = async function(req, res) {
  try {
    // Fetch all products
    const products = await Product.find();

    // Send the products as the response
    res.json(products);
  } catch (error) {
    // Log the error and send a server error response
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Refactored ParkingLot class
class ParkingLot {
  constructor(size) {
    // Initialize the parking slots and available count
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }

  // Park a car in the parking lot
  parkCar(car) {
    // Check if the parking lot is full
    if (this.availableCount === 0) return false;

    // Find the first available slot
    const emptySlot = this.slots.findIndex(slot => slot === null);

    // Park the car in the available slot
    this.slots[emptySlot] = car;
    this.availableCount--;

    return true;
  }

  // Remove a car from the parking lot
  removeCar(car) {
    // Find the slot index of the given car
    const slotIndex = this.slots.findIndex(slot => slot === car);

    // If the car is not found, return false
    if (slotIndex === -1) return false;

    // Remove the car from the slot and increment the available count
    this.slots[slotIndex] = null;
    this.availableCount++;

    return true;
  }

  // Get the number of available slots
  getAvailableSlots() {
    return this.availableCount;
  }

  // Check if the parking lot is full
  isFull() {
    return this.availableCount === 0;
  }
}
