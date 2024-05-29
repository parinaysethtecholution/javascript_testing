
// Refactored code with improved readability, maintainability, and comments

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.SECRET_KEY;

/**
 * Register a new user
 * @param {Object} req - The request object containing user registration details
 * @param {Object} res - The response object to send the response
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    try {
        // Destructure the required fields from the request body
        const { email, phone, name, address, password, role } = req.body;

        // Check if a user with the same email or phone already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

        // If a user already exists, return an error response
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or phone already exists' });
        }

        // Hash the password using bcrypt for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the provided details and hashed password
        const user = new User({ email, phone, name, address, password: hashedPassword, role });

        // Save the new user to the database
        await user.save();

        // Generate a JSON Web Token (JWT) with the user's ID and role
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);

        // Return a success response with the generated token
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        // Log the error and return an internal server error response
        console.error('Error in register:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Login a user
 * @param {Object} req - The request object containing user login credentials
 * @param {Object} res - The response object to send the response
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
    try {
        // Destructure the email and password from the request body
        const { email, password } = req.body;

        // Find the user with the provided email
        const user = await User.findOne({ email });

        // If no user is found, return an error response
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match, return an error response
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If the credentials are valid, return the user object
        res.json({ user });
    } catch (error) {
        // Log the error and return an internal server error response
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login
};

/**
 * ParkingLot class to manage a parking lot with a fixed number of slots
 */
class ParkingLot {
  /**
   * Constructor to initialize the parking lot
   * @param {number} size - The total number of slots in the parking lot
   */
  constructor(size) {
    // Create an array to store the cars, initially filled with null values
    this.slots = new Array(size).fill(null);
    // Keep track of the number of available slots
    this.availableCount = size;
  }

  /**
   * Park a car in the parking lot
   * @param {string} car - The registration number of the car to be parked
   * @returns {boolean} - True if the car was successfully parked, false otherwise
   */
  parkCar(car) {
    // If there are no available slots, return false
    if (this.availableCount === 0) return false;

    // Find the index of the first available slot
    const emptySlot = this.slots.findIndex(slot => slot === null);

    // Park the car in the available slot
    this.slots[emptySlot] = car;
    // Decrement the available count
    this.availableCount--;

    // Return true to indicate successful parking
    return true;
  }

  /**
   * Remove a car from the parking lot
   * @param {string} car - The registration number of the car to be removed
   * @returns {boolean} - True if the car was successfully removed, false otherwise
   */
  removeCar(car) {
    // Find the index of the slot where the car is parked
    const slotIndex = this.slots.findIndex(slot => slot === car);

    // If the car is not found, return false
    if (slotIndex === -1) return false;

    // Remove the car from the slot
    this.slots[slotIndex] = null;
    // Increment the available count
    this.availableCount++;

    // Return true to indicate successful removal
    return true;
  }

  /**
   * Get the number of available slots in the parking lot
   * @returns {number} - The number of available slots
   */
  getAvailableSlots() {
    return this.availableCount;
  }

  /**
   * Check if the parking lot is full
   * @returns {boolean} - True if the parking lot is full, false otherwise
   */
  isFull() {
    return this.availableCount === 0;
  }
}

// Example usage
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // Output: 8
console.log(lot.removeCar("TRUCK789")); // Output: true
console.log(lot.isFull()); // Output: false
