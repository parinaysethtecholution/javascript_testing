
// Importing required modules
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// JWT secret key from environment variable
const JWT_SECRET = process.env.SECRET_KEY;

// User registration handler
const register = async (req, res) => {
  try {
    // Destructuring request body
    const { email, phone, name, address, password, role } = req.body;

    // Check if user with the same email or phone already exists
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

// User login handler
const login = async (req, res) => {
  try {
    // Destructuring request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send user object as response
    res.json({ user });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export register and login handlers
module.exports = {
  register,
  login
};
