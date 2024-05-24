
// Refactored code with improved readability and maintainability

// Import the Product model
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { name, price, imageLink } = req.body;

    // Create a new product instance
    const newProduct = new Product({ name, price, imageLink });

    // Save the new product to the database
    await newProduct.save();

    // Return a success response with the created product
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    // Log the error and return a server error response
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find(); // Fetch all products from the database
    res.json(products); // Return the list of products
  } catch (error) {
    console.error('Error fetching products:', error); // Log the error and return a server error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, imageLink } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, imageLink },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error); // Log the error and return a server error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
