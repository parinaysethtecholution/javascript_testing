
// Importing required modules and initializing constants
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key for JWT
const JWT_SECRET = process.env.SECRET_KEY;

/**
 * Register a new user.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object.
 */
const registerUser = async (req, res) => {
    try {
        // Destructuring user details from request body
        const { email, phone, name, address, password, role } = req.body;
        
        // Check if user already exists with the given email or phone
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or phone already exists' });
        }

        // Hashing the user's password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Creating a new user instance
        const newUser = new User({ email, phone, name, address, password: hashedPassword, role });
        
        // Saving the new user to the database
        await newUser.save();
        
        // Generating a JWT token for the new user
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET);
        
        // Sending success response with the token
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        // Logging and sending error response
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Authenticate a user and provide a token.
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object.
 */
const loginUser = async (req, res) => {
    try {
        // Destructuring email and password from request body
        const { email, password } = req.body;
        
        // Finding the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Comparing the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Sending the user data in the response
        res.json({ user });
    } catch (error) {
        // Logging and sending error response
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Exporting the authentication functions
module.exports = {
    register: registerUser,
    loginUser
};
