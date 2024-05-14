
// Import the Product model
import Product from '../models/Product';

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Extract product details from the request body
    const { name, price, imageLink } = req.body;

    // Create a new product instance
    const newProduct = new Product({ name, price, imageLink });

    // Save the new product to the database
    await newProduct.save();

    // Send a success response with the created product
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    // Log the error and send an error response
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Send the fetched products as the response
    res.json(products);
  } catch (error) {
    // Log the error and send an error response
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
