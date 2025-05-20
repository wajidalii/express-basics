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
        next();
    } catch (err) {
        throw new Error(`Error in middleware: ${err.message}`);
    }
});

// Basic route to handle GET requests
app.get('/', (req, res) => {
    res.send('Express.js is running perfectly!');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/users/:id', (req, res) => {
    res.send(`User ID is ${req.params.id}`);
});

app.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`You searched for: ${q}`);
});

app.get('/task', (req, res) => res.send('Get task'));
app.post('/task', (req, res) => res.send('Create task'));
app.put('/task/:id', (req, res) => res.send(`Update task ${req.params.id}`));
app.delete('/task/:id', (req, res) => res.send(`Delete task ${req.params.id}`));

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