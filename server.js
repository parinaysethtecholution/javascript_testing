
// Import required modules
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

// Create an Express app instance
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Define API endpoint
const apiEndpoint = '/api/endpoint';

// POST route for API endpoint
app.post('/api', async (req, res) => {
  try {
    // Get API key from environment variable
    const apiKey = process.env.API_KEY;

    // Send POST request to API endpoint
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
    // Get news API key from environment variable
    const newsApiKey = process.env.NEWS_API_KEY;

    // Get query parameters
    const q = req.query.q;
    const from = req.query.from;

    // Construct news API URL
    const newsApiUrl = `https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`;

    // Send GET request to news API
    const apiResponse = await axios.get(newsApiUrl);

    // Send response data
    res.json(apiResponse.data);
  } catch (error) {
    // Log and handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
