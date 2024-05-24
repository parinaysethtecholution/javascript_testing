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
const logout = async (req, res) => {
  try {
    // Clear the token from the client-side (e.g., remove from localStorage or cookies)
    res.clearCookie('token');

    // Optionally, you can also invalidate or blacklist the token on the server-side
    // if you want to prevent further usage of the same token

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login
};
