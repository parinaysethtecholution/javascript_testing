
// controller.test.js

const { createProduct, getAllProducts } = require('./controller');
const Product = require('../models/Product');

// Mock the Product model
jest.mock('../models/Product');

describe('createProduct', () => {
  it('should create a new product successfully', async () => {
    const req = {
      body: {
        name: 'Test Product',
        price: 10.99,
        imageLink: 'https://example.com/image.jpg'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createProduct(req, res);

    expect(Product).toHaveBeenCalledWith({
      name: 'Test Product',
      price: 10.99,
      imageLink: 'https://example.com/image.jpg'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Product created successfully',
      product: expect.any(Object)
    });
  });

  it('should handle errors during product creation', async () => {
    const req = {
      body: {
        name: 'Test Product',
        price: 10.99,
        imageLink: 'https://example.com/image.jpg'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const error = new Error('Internal Server Error');
    Product.mockImplementation(() => {
      throw error;
    });

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getAllProducts', () => {
  it('should fetch all products successfully', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    const mockProducts = [
      { _id: '1', name: 'Product 1', price: 9.99, imageLink: 'https://example.com/product1.jpg' },
      { _id: '2', name: 'Product 2', price: 14.99, imageLink: 'https://example.com/product2.jpg' }
    ];
    Product.find.mockResolvedValue(mockProducts);

    await getAllProducts(req, res);

    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it('should handle errors during product fetching', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const error = new Error('Internal Server Error');
    Product.find.mockRejectedValue(error);

    await getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
