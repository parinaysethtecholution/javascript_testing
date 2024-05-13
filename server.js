
import express from 'express'; // ES6 import syntax
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config'; // Load environment variables from .env file

// Create an Express application
const app = express();

// Enable CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// API endpoint URL
const apiEndpoint = '/api/endpoint';

// Route for handling POST requests to /api
app.post('/api', async (req, res) => {
  try {
    // Get API key from environment variable
    const apiKey = process.env.API_KEY;

    // Send POST request to the API endpoint with request body and headers
    const response = await axios.post(apiEndpoint, req.body, {
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

// Route for handling GET requests to /api/news
app.get('/api/news', async (req, res) => {
  try {
    // Get news API key from environment variable
    const newsApiKey = process.env.NEWS_API_KEY;

    // Get query parameters from the request
    const q = req.query.q;
    const from = req.query.from;

    // Construct the API URL with query parameters
    const url = `https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`;

    // Send GET request to the API endpoint
    const apiResponse = await axios.get(url);

    // Send the response data back to the client
    res.json(apiResponse.data);
  } catch (error) {
    // Log the error and handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
