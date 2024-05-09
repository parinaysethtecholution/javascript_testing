
// Import the Product model
import Product from '../models/Product';

/**
 * Create a new product
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, price, imageLink } = req.body;

    // Create a new product instance
    const newProduct = new Product({ name, price, imageLink });

    // Save the new product to the database
    await newProduct.save();

    // Send a success response with the created product
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get all products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find();

    // Send the products as the response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
