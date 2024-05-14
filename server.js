
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

// Create an Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define the API endpoint
const apiEndpoint = '/api/endpoint';

// Route for handling POST requests to /api
app.post('/api', async (req, res) => {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.API_KEY;

    // Send a POST request to the API endpoint with the request body and headers
    const response = await axios.post(apiEndpoint, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      }
    });

    // Send the response data as JSON
    res.json(response.data);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for handling GET requests to /api/news
app.get('/api/news', async (req, res) => {
  try {
    // Get the News API key from environment variables
    const newsApiKey = process.env.NEWS_API_KEY;

    // Get the query parameters
    const q = req.query.q;
    const from = req.query.from;

    // Construct the API URL with query parameters
    const apiUrl = `https://sample/api?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${newsApiKey}`;

    // Send a GET request to the API URL
    const apiResponse = await axios.get(apiUrl);

    // Send the API response data as JSON
    res.json(apiResponse.data);
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
