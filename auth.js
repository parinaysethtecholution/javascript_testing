
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.SECRET_KEY;

const register = async (req, res) => {
  try {
    const { email, phone, name, address, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }
    // Hash the password using bcrypt for security
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, phone, name, address, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login
};


class ParkingLot {
  constructor(size) {
    // Initialize an array of slots with null values
    this.slots = new Array(size).fill(null);
    // Keep track of the available slots
    this.availableCount = size;
  }

  parkCar(car) {
    // Check if there are available slots
    if (this.availableCount === 0) return false;
    // Find the first available slot
    const emptySlot = this.slots.findIndex(slot => slot === null);
    // Park the car in the available slot
    this.slots[emptySlot] = car;
    // Decrement the available slot count
    this.availableCount--;
    return true;
  }

  removeCar(car) {
    // Find the index of the car in the slots array
    const slotIndex = this.slots.findIndex(slot => slot === car);
    // If the car is not found, return false
    if (slotIndex === -1) return false;
    // Remove the car from the slot
    this.slots[slotIndex] = null;
    // Increment the available slot count
    this.availableCount++;
    return true;
  }

  getAvailableSlots() {
    // Return the number of available slots
    return this.availableCount;
  }

  isFull() {
    // Check if there are no available slots
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
