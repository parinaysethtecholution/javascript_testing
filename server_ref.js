
// Import required modules
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

// Create an Express app instance
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Define API endpoints
const API_ENDPOINT = '/api/endpoint';
const NEWS_API_ENDPOINT = 'https://sample/api';

// Handle POST requests to the '/api' endpoint
app.post('/api', async (req, res) => {
  try {
    // Get API key from environment variables
    const apiKey = process.env.API_KEY;

    // Make a POST request to the API endpoint
    const response = await axios.post(API_ENDPOINT, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      }
    });

    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle GET requests to the '/api/news' endpoint
app.get('/api/news', async (req, res) => {
  try {
    // Get News API key from environment variables
    const newsApiKey = process.env.NEWS_API_KEY;

    // Get query parameters from the request
    const { q, from } = req.query;

    // Construct the API URL with query parameters
    const apiUrl = `${NEWS_API_ENDPOINT}?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`;

    // Make a GET request to the News API
    const apiResponse = await axios.get(apiUrl);

    // Send the response data back to the client
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
