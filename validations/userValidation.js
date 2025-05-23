const { body, param } = require('express-validator');

const userFieldsRules = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim().escape(),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(),

    body('role')
        .notEmpty().withMessage('Role is required')
        .isString().withMessage('Role must be a string')
        .trim().escape(),
];

const userRegistrationRules = [
    ...userFieldsRules,
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim(),
];

const userLoginRules = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .trim(),
];

const userIdParamRules = [
    param('id').isInt().withMessage('ID must be an integer'),
];

exports.createUserRules = [...userFieldsRules];

exports.updateUserRules = [...userIdParamRules, ...userFieldsRules];

exports.userRegistrationRules = [...userRegistrationRules];

exports.userLoginRules = [...userLoginRules];

exports.userIdParamRules = [...userIdParamRules];