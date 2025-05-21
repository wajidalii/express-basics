// User routes module
// This module handles user-related routes
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validation');

router.get('/', userController.getAllUsers);

router.get('/:id', param('id').isInt().withMessage('ID must be an integer'),
    userController.getUserById);

router.post('/', body('name').isString().withMessage('Name must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email address'),
    validate,
    userController.createUser);

router.put('/:id', param('id').isInt().withMessage('ID must be an integer'),
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email address'),
    validate,
    userController.updateUser);

router.delete('/:id', param('id').isInt().withMessage('ID must be an integer'),
    validate,
    userController.deleteUser);

module.exports = router;