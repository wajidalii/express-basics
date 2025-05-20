// Task routes module
// This module handles task-related routes
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes for task-related operations
router.get('/', taskController.getAllTasks); // Get all tasks
router.get('/:id', taskController.getTaskById); // Get task by ID
router.post('/', taskController.createTask); // Create a new task
router.put('/:id', taskController.updateTask); // Update task by ID
router.delete('/:id', taskController.deleteTask); // Delete task by ID

module.exports = router;