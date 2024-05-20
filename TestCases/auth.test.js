
// auth.test.js

const { register, login } = require('./auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('../models/User');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('register function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test User',
        address: '123 Main St',
        password: 'password',
        role: 'user'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    jwt.sign.mockReturnValue('testToken');

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ email: req.body.email }, { phone: req.body.phone }]
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
    expect(User).toHaveBeenCalledWith({
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      address: req.body.address,
      password: 'hashedPassword',
      role: req.body.role
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      token: 'testToken'
    });
  });

  it('should return an error if the user already exists', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        phone: '1234567890'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue({ email: 'test@example.com' });

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ email: req.body.email }, { phone: req.body.phone }]
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'User with this email or phone already exists'
    });
  });

  it('should handle errors during registration', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        phone: '1234567890'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockRejectedValue(new Error('Database error'));

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ email: req.body.email }, { phone: req.body.phone }]
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error'
    });
  });
});

describe('login function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log in a user successfully', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    };
    const res = {
      json: jest.fn()
    };

    User.findOne.mockResolvedValue({
      _id: '123456789',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'user'
    });
    bcrypt.compare.mockResolvedValue(true);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedPassword');
    expect(res.json).toHaveBeenCalledWith({ user: {
      _id: '123456789',
      email: 'test@example.com',
      role: 'user'
    }});
  });

  it('should return an error if the user is not found', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should return an error if the password is invalid', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue({
      _id: '123456789',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'user'
    });
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should handle errors during login', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockRejectedValue(new Error('Database error'));

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
