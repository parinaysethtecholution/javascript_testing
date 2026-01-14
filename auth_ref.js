// Refactored code with improved readability and maintainability

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.SECRET_KEY;

/**
 * Register a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    try {
        const { email, phone, name, address, password, role } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or phone already exists' });
        }

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

/**
 * Login a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

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

const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots());
console.log(lot.removeCar("TRUCK789"));
console.log(lot.isFull());
