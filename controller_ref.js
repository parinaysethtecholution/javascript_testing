// Import the Product model
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, imageLink } = req.body;

    // Validate required fields
    if (!name || !price || !imageLink) {
      return res.status(400).json({ error: 'Name, price, and image link are required.' });
    }

    // Create a new product instance
    const newProduct = new Product({ name, price, imageLink });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Unable to create product. Please try again later.' });
  }
};

// Fetch all products with optional pagination
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default values for pagination

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments();

    res.json({
      totalProducts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Unable to fetch products. Please try again later.' });
  }
};
