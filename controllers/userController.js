const userService = require('../services/userService');

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

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};