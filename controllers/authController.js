const userService = require('../services/userService');
const bcrypt = require('bcryptjs');
const { signAccessToken, signRefreshToken } = require('../utils/auth');
const { COOKIE_OPTIONS } = require('../config/auth');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = { id: users.length + 1, name, email, password: hashedPassword };
        users.push(newUser);

        // Generate token
        const token = generateAccessToken(newUser);

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) return res.status(401).send('Invalid credentials');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).send('Invalid credentials');

        // Sign tokens
        const accessToken = signAccessToken(user);
        const { token: refreshToken, expires } = signRefreshToken(user);

        // Store refresh token in DB
        await userService.saveRefreshToken(user.id, refreshToken, expires);

        // Send refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

        res.json({ accessToken });
    } catch (err) {
        next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).send('Refresh token missing');

        const user = await userService.getUserByRefreshToken(token);
        if (!user) return res.status(403).send('Invalid or expired refresh token');

        // Issue new tokens
        const accessToken = signAccessToken(user);
        const { token: newRefreshToken, expires } = signRefreshToken(user);

        // Update stored refresh token
        await userService.saveRefreshToken(user.id, newRefreshToken, expires);

        // Overwrite cookie
        res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);

        res.json({ accessToken });
    } catch (err) {
        return res.status(401).send('Invalid refresh token');
    }
};
