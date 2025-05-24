const bcrypt = require('bcryptjs');
const { signAccessToken, signRefreshToken } = require('../utils/auth');
const userRepo = require('../repositories/userRepository');
const authRepo = require('../repositories/authRepository');

exports.getUserByRefreshToken = (token) => authRepo.getUserByRefreshToken(token);

exports.verify = (token) => authRepo.verify(token);

exports.register = async ({ name, email, password }) => {
    const existing = await userRepo.findByEmail(email);
    if (existing) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await userRepo.create({ name, email, password: hashed });
    return newUser;
};

exports.login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const accessToken = signAccessToken(user);
    const { token: refreshToken, expires } = signRefreshToken(user);
    await authRepo.saveRefreshToken(user.id, refreshToken, expires);

    return { user, accessToken, refreshToken };
};

exports.refreshToken = async (oldToken) => {
    if (!oldToken) throw new Error('Refresh token missing');

    const user = await authRepo.getUserByRefreshToken(oldToken);
    if (!user) throw new Error('Invalid or expired refresh token');

    const accessToken = signAccessToken(user);
    const { token: newRefreshToken, expires } = signRefreshToken(user);

    await authRepo.saveRefreshToken(user.id, newRefreshToken, expires);

    return { accessToken, refreshToken: newRefreshToken };
};

exports.saveRefreshToken = (userId, token, expires) =>
    authRepo.saveRefreshToken(userId, token, expires);

exports.clearRefreshToken = (userId) => authRepo.clearRefreshToken(userId);

exports.logout = async (token) => {
    try {
        const user = await authRepo.getUserByRefreshToken(token);
        if (user) {
            const result = await authRepo.clearRefreshToken(user.id);
            return result;
        }
    } catch (err) {
        next(err);
    }
};