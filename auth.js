
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.SECRET_KEY;

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export async function register(req, res) {
  try {
    const { email, phone, name, address, password, role } = req.body;

    // Check if a user with the same email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, phone, name, address, password: hashedPassword, role });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);

    // Return the user registration success message and the token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Logs in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return the user object
    res.json({ user });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
