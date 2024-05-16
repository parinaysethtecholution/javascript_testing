const Product = require('../models/Product');

/**
 * Create a new product and save it to the database.
 * @param {Object} req - The request object containing the product details.
 * @param {Object} res - The response object to send back the HTTP response.
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, price, imageLink } = req.body;
    const newProduct = new Product({ name, price, imageLink });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Fetch all products from the database and return them.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the HTTP response.
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};