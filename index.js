require('dotenv').config();
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Custom middleware to log request details
app.use((req, res, next) => {
    console.log(`Date: ${new Date().toISOString()} - ip: ${req.ip} method: ${req.method} url: '${req.url}'`);
    next();
});

// Basic route to handle GET requests
app.get('/', (req, res) => {
    res.send('Express.js is running perfectly!');
})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});