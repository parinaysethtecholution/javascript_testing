
// server.test.js

const request = require('supertest');
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Mock the axios module
jest.mock('axios');

// Test cases for the /api endpoint
describe('POST /api', () => {
  it('should make a successful API call and return the response data', async () => {
    const mockResponse = { data: { message: 'Success' } };
    axios.post.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/api')
      .send({ data: 'test' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/api/endpoint',
      { data: 'test' },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.API_KEY,
        },
      }
    );
  });

  it('should return a 500 error when the API call fails', async () => {
    const mockError = new Error('Internal Server Error');
    axios.post.mockRejectedValue(mockError);

    const response = await request(app)
      .post('/api')
      .send({ data: 'test' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
    expect(axios.post).toHaveBeenCalledWith(
      '/api/endpoint',
      { data: 'test' },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.API_KEY,
        },
      }
    );
  });
});

// Test cases for the /api/news endpoint
describe('GET /api/news', () => {
  it('should make a successful API call and return the response data', async () => {
    const mockResponse = { data: { articles: [{ title: 'Test Article' }] } };
    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/news')
      .query({ q: 'test', from: '2023-04-01' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      `https://sample/api?q=test&from=2023-04-01&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );
  });

  it('should return a 500 error when the API call fails', async () => {
    const mockError = new Error('Internal Server Error');
    axios.get.mockRejectedValue(mockError);

    const response = await request(app)
      .get('/api/news')
      .query({ q: 'test', from: '2023-04-01' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
    expect(axios.get).toHaveBeenCalledWith(
      `https://sample/api?q=test&from=2023-04-01&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );
  });
});
