
// Import required modules
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Get the JWT secret key from environment variables
const JWT_SECRET = process.env.SECRET_KEY;

// Register a new user
const register = async (req, res) => {
  try {
    // Destructure the request body
    const { email, phone, name, address, password, role } = req.body;

    // Check if a user with the same email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({ email, phone, name, address, password: hashedPassword, role });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);

    // Send the response with the token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// User login
const login = async (req, res) => {
  try {
    // Destructure the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If no user is found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the password doesn't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send the user object as the response
    res.json({ user });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the register and login functions
export { register, login };
