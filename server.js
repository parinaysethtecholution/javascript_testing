
var express = require('express');
var cors = require('cors');
var axios = require('axios');
require('dotenv').config();

var app = express();

app.use(cors());
app.use(express.json());

var apiEndpoint = '/api/endpoint';

// Refactored the POST /api route
app.post('/api', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.post(apiEndpoint, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const newsApiKey = process.env.NEWS_API_KEY;
    const { q, from } = req.query;
    const apiResponse = await axios.get(`https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`);
    res.json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

var PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
