require('dotenv').config();
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Custom middleware to log request details
app.use((req, res, next) => {
    try {
        console.log(`Date: ${new Date().toISOString()} 
        - ip: ${req.ip} method: ${req.method} url: '${req.url}'`);

        throw new Error('Custom error for testing'); // triggers error handler
    } catch (err) {
        next(err);
    }
});

// Basic route to handle GET requests
app.get('/', (req, res) => {
    res.send('Express.js is running perfectly!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});