
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiEndpoint = 'https://api.example.com/endpoint';

// Function to handle API requests
const handleApiRequest = async (req, res, url, headers) => {
  try {
    const response = await axios.post(url, req.body, { headers });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.post('/api', (req, res) => {
  const apiKey = process.env.API_KEY;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': apiKey
  };
  handleApiRequest(req, res, apiEndpoint, headers);
});

// Function to handle news requests
const handleNewsRequest = async (req, res, url) => {
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.get('/api/news', (req, res) => {
  const newsApiKey = process.env.NEWS_API_KEY;
  const { q, from } = req.query;
  const url = `https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`;
  handleNewsRequest(req, res, url);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
