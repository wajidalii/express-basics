// Task routes module
// This module handles task-related routes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Get task'));
router.get('/:id', (req, res) => res.send(`Get task ${req.params.id}`));
router.post('/', (req, res) => res.send('Create task'));
router.put('/:id', (req, res) => res.send(`Update task ${req.params.id}`));
router.delete('/:id', (req, res) => res.send(`Delete task ${req.params.id}`));

module.exports = router;