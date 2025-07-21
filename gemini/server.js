const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 6969;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Gemini API configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBPkcqydg9WgCiQ1KUSXPlg8sDxO3B8c_Y'; // Replace YOUR_API_KEY with your actual key

app.post('/', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        // Send user query to Gemini AI
        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: query
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // const aiResponse = response.data?.outputs?.[0]?.text || "No response received from Gemini.";
        // const aiResponse = response.data?.candidates?.[0]?.content?.parts?[0].text || "No meaningful response received from Gemini.";
        const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No meaningful response received from Gemini.";

        res.json({ message: aiResponse });
        console.log('Raw Gemini Response:', response.data);

        console.log("ok");
    } catch (error) {
        console.error('Error communicating with Gemini AI:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to communicate with Gemini AI' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Gemini AI backend server is running at http://127.0.0.1:${PORT}`);
});
