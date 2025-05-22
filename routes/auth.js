const express = require('express');
const validate = require('../middlewares/validation');
const { userLoginRules, userRegistrationRules } = require('../validations/userValidation');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', userRegistrationRules, validate, authController.register);
router.post('/login', userLoginRules, validate, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;