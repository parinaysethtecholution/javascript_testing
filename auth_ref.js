
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

        // Check if a user with the given email or phone already exists
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
    module.exports = {
        register,
        login
    };
}
