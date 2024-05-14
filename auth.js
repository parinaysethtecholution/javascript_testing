
// Import required modules
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Secret key for JWT
const JWT_SECRET = process.env.SECRET_KEY;

// Register a new user
const register = async (req, res) => {
  try {
    // Destructure request body
    const { email, phone, name, address, password, role } = req.body;

    // Check if user with email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, phone, name, address, password: hashedPassword, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);

    // Send response with token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// User login
const login = async (req, res) => {
  try {
    // Destructure request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send response with user data
    res.json({ user });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export functions
export default {
  register,
  login,
};
