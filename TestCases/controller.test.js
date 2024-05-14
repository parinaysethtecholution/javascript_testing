
// controller.test.js

const { createProduct, getAllProducts } = require('./controller');
const Product = require('../models/Product');

jest.mock('../models/Product');

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

      Product.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true)
      }));

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

      Product.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Database error'))
      }));

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

      Product.find = jest.fn().mockResolvedValue([
        { name: 'Product 1', price: 9.99, imageLink: 'https://example.com/product1.jpg' },
        { name: 'Product 2', price: 14.99, imageLink: 'https://example.com/product2.jpg' }
      ]);

      await getAllProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith();
      expect(res.json).toHaveBeenCalledWith([
        { name: 'Product 1', price: 9.99, imageLink: 'https://example.com/product1.jpg' },
        { name: 'Product 2', price: 14.99, imageLink: 'https://example.com/product2.jpg' }
      ]);
    });

    it('should handle errors during product fetching', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Product.find = jest.fn().mockRejectedValue(new Error('Database error'));

      await getAllProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
