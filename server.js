
// Import required modules
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

// Create an Express application
const app = express();

// Use CORS middleware and JSON parser
app.use(cors());
app.use(express.json());

// Define API endpoint
const apiEndpoint = '/api/endpoint';

// POST route for API endpoint
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
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for news API
app.get('/api/news', async (req, res) => {
  try {
    const newsApiKey = process.env.NEWS_API_KEY;
    const q = req.query.q;
    const from = req.query.from;
    const apiResponse = await axios.get(`https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`);
    res.json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
