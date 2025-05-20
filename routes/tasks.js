// Task routes module
// This module handles task-related routes
const express = require('express');
const router = express.Router();

router.get('/task', (req, res) => res.send('Get task'));
router.post('/task', (req, res) => res.send('Create task'));
router.put('/task/:id', (req, res) => res.send(`Update task ${req.params.id}`));
router.delete('/task/:id', (req, res) => res.send(`Delete task ${req.params.id}`));

module.exports = router;