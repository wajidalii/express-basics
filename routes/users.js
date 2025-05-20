// User routes module
// This module handles user-related routes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All users');
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User with ID: ${userId}`);
});

module.exports = router;