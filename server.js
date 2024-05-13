
// Import required modules
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

// Create an Express app instance
const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define API endpoint
const apiEndpoint = '/api/endpoint';

// POST route for API endpoint
app.post('/api', async (req, res) => {
  try {
    // Get API key from environment variable
    const apiKey = process.env.API_KEY;

    // Make POST request to API endpoint
    const response = await axios.post(apiEndpoint, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      }
    });

    // Send response data
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for news API
app.get('/api/news', async (req, res) => {
  try {
    // Get API key from environment variable
    const newsApiKey = process.env.NEWS_API_KEY;

    // Get query parameters
    const { q, from } = req.query;

    // Make GET request to news API
    const apiResponse = await axios.get(`https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`);

    // Send API response data
    res.json(apiResponse.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
