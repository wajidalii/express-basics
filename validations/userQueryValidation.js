const { query } = require('express-validator');

const getUsersQueryRules = [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 10 }).toInt(),
    query('sort').optional().isIn(['id', 'name', 'email', 'createdAt']),
    query('order').optional().isIn(['asc', 'desc']).toLowerCase(),
    query('name').optional().trim().escape(),
    query('email').optional().isEmail().normalizeEmail(),
];

module.exports = {
    getUsersQueryRules,
};