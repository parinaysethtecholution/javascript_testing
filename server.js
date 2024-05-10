
// Import required modules
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

// Create an Express application
const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define API endpoint
const apiEndpoint = '/api/endpoint';

// POST route to forward requests to the API endpoint
app.post('/api', async (req, res) => {
  try {
    // Get API key from environment variable
    const apiKey = process.env.API_KEY;

    // Forward the request to the API endpoint with authorization header
    const response = await axios.post(apiEndpoint, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      }
    });

    // Send the response from the API endpoint
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to fetch news from an external API
app.get('/api/news', async (req, res) => {
  try {
    // Get news API key from environment variable
    const newsApiKey = process.env.NEWS_API_KEY;

    // Get query parameters from the request
    const { q, from } = req.query;

    // Construct the API URL with query parameters
    const apiUrl = `https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`;

    // Send a GET request to the news API
    const apiResponse = await axios.get(apiUrl);

    // Send the response from the news API
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
