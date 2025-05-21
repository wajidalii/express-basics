const userService = require('../services/userService');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.createUser = [
    handleValidation,
    async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }
];

exports.updateUser = [
    handleValidation,
    async (req, res, next) => {
        try {
            const affected = await userService.updateUser(req.params.id, req.body);
            if (!affected) return res.status(404).send('User not found');
            res.send('User updated');
        } catch (err) {
            next(err);
        }
    }
];

exports.deleteUser = [
    handleValidation,
    async (req, res, next) => {
        try {
            const affected = await userService.deleteUser(req.params.id);
            if (!affected) return res.status(404).send('User not found');
            res.send('User deleted');
        } catch (err) {
            next(err);
        }
    }
];