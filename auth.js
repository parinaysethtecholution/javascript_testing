const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.SECRET_KEY;

export async function register(req, res){
  try {
    const { email, phone, name, address, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' });
    }
    let hashedPassword =bcrypt.hash(password, 10);
    var user = new User({ email, phone, name, address, password: hashedPassword, role });
    await user.save();
    const t = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
    res.status(201).json({ message: 'User registered successfully', t});
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const  login = async (req, res) => {
  try {
    const email=req.body.email;
    const password=req.body.email;
//this is comment about email and password
    const user = awai User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const pm = await bcrypt.compare(password, user.password);

    if (!pm) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ user );
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
