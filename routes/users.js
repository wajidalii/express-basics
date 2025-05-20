// User routes module
// This module handles user-related routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for user-related operations
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.post('/', userController.createUser); // Create a new user
router.put('/:id', userController.updateUser); // Update user by ID
router.delete('/:id', userController.deleteUser); // Delete user by ID

module.exports = router;