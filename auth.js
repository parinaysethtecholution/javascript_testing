
import { User } from '../models/User';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.SECRET_KEY;

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The response with a success message and a JWT token.
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

    // Return the success response
    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Logs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The response with the user object.
 */
export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return the user object
    return res.json({ user });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
