
// Import required modules
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Get the JWT secret key from environment variables
const JWT_SECRET = process.env.SECRET_KEY;

// Register a new user
const register = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { email, phone, name, address, password, role } = req.body;

    // Check if a user with the same email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    // If a user with the same email or phone exists, return an error
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the provided data and hashed password
    const user = new User({ email, phone, name, address, password: hashedPassword, role });

    // Save the new user to the database
    await user.save();

    // Generate a JWT token with the user's ID and role
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);

    // Return a success response with the token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    // Log the error and return an internal server error response
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login an existing user
const login = async (req, res) => {
  try {
    // Destructure the email and password from the request body
    const { email, password } = req.body;

    // Find a user with the provided email
    const user = await User.findOne({ email });

    // If no user is found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return the user object as the response
    res.json({ user });
  } catch (error) {
    // Log the error and return an internal server error response
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the register and login functions
export default {
  register,
  login
};
