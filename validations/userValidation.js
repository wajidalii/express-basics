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
];

const userIdParamRules = [
    param('id').isInt().withMessage('ID must be an integer'),
];

exports.createUserRules = [...userFieldsRules];

exports.updateUserRules = [...userIdParamRules, ...userFieldsRules];

exports.userIdParamRules = userIdParamRules;