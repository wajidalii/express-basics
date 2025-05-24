// User routes module
// This module handles user-related routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validation');
const { createUserRules, updateUserRules, userIdParamRules } = require('../validations/userValidation');
const upload = require('../middlewares/upload');
const { getUsersQueryRules } = require('../validations/userQueryValidation');

router.get('/', getUsersQueryRules, validate, userController.getAllUsers);

router.get('/:id', userIdParamRules, validate, userController.getUserById);

router.post('/', createUserRules, validate, userController.createUser);

router.put('/:id', updateUserRules, validate, userController.updateUser);

router.delete('/:id', userIdParamRules, validate, userController.deleteUser);

router.post('/file', upload.single('file'), userController.uploadFile);

module.exports = router;