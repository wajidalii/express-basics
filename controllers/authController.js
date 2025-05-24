// authController.js
const authService = require('../services/authService');
const { COOKIE_OPTIONS } = require('../config/auth');

exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        if (err.message === 'User already exists') {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = await authService.login(req.body);
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
        res.status(200).json({ message: 'Login successful', accessToken });
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        const { accessToken, refreshToken: newToken } = await authService.refreshToken(token);

        res.cookie('refreshToken', newToken, COOKIE_OPTIONS);
        res.status(200).json({ message: 'Tokens refreshed successfully', accessToken });
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

exports.logout = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            await authService.logout(token);
        }
        res.clearCookie('refreshToken', COOKIE_OPTIONS);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
};
