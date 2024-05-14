
// Import the Product model
import Product from '../models/Product';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { name, price, imageLink } = req.body;

    // Create a new product instance
    const newProduct = new Product({ name, price, imageLink });

    // Save the new product to the database
    await newProduct.save();

    // Send a success response with the created product
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    // Log the error to the console
    console.error('Error creating product:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find();

    // Send the products as a response
    res.json(products);
  } catch (error) {
    // Log the error to the console
    console.error('Error fetching products:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
