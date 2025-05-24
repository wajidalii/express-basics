const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort = 'id', order = 'asc', name, email } = req.query;
        const options = {
            page,
            limit,
            sort,
            order,
            filter: {
                name,
                email
            }
        }
        const users = await userService.getAllUsers(options);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
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
        const affected = await userService.updateUser(req.params.id, req.body);
        if (!affected) return res.status(404).send('User not found');
        res.status(200).send('User updated');
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const affected = await userService.deleteUser(req.params.id);
        if (!affected) return res.status(404).send('User not found');
        res.status(200).send('User deleted');
    } catch (err) {
        next(err);
    }
};

exports.uploadFile = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send('No file uploaded');
        res.status(201).json({ filePath: file.path, message: 'File uploaded successfully' });
    } catch (err) {
        next(err);
    }
};