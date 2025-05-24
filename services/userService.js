const bcrypt = require('bcryptjs');
const db = require('../config/db');
const crypto = require('crypto');
const UserRepository = require('../repositories/userRepository');
const TokenRepository = require('../repositories/tokenRepository');
const { signAccessToken, signRefreshToken } = require('../utils/auth');

exports.getAllUsers = async (options) => {
    const { sort, order, filter } = options;
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const offset = (page - 1) * limit;

    let where = 'WHERE 1';
    const params = [];

    if (filter?.name) {
        where += ` AND name LIKE ?`;
        params.push(`%${filter.name}%`);
    }
    if (filter?.email) {
        where += ` AND email LIKE ?`;
        params.push(`%${filter.email}%`);
    }

    const total = await UserRepository.count(where, params);
    if (total === 0) {
        return { data: [], meta: { total, page, limit, totalPages: 0 } };
    }

    const totalPages = Math.ceil(total / limit);
    if (page > totalPages) {
        throw new Error('Page number exceeds total pages');
    }

    const rows = await UserRepository.findPaginated(
        where, params, sort, order, limit, offset
    );

    return {
        data: rows,
        meta: { total, page, limit, totalPages }
    };
};

exports.getUserById = (id) => UserRepository.findById(id);

exports.createUser = (data) => {
    const { name, email, password, role } = data;
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    return UserRepository.create({
        name,
        email,
        password,
        role,
        verificationToken: token,
        verificationExpires: expires
    });
};

exports.updateUser = (id, data) => UserRepository.update(id, data);

exports.deleteUser = (id) => UserRepository.delete(id);

exports.verifyUser = (token) => TokenRepository.verifyUser(token);

exports.saveRefreshToken = (userId, token, expires) =>
    TokenRepository.saveRefreshToken(userId, token, expires);

exports.getUserByRefreshToken = (token) => TokenRepository.getUserByRefreshToken(token);

exports.clearRefreshToken = (userId) => TokenRepository.clearRefreshToken(userId);

exports.registerUser = async ({ name, email, password }) => {
    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.create({ name, email, password: hashed });
    return newUser;
};

exports.loginUser = async ({ email, password }) => {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const accessToken = signAccessToken(user);
    const { token: refreshToken, expires } = signRefreshToken(user);
    await TokenRepository.saveRefreshToken(user.id, refreshToken, expires);

    return { accessToken, refreshToken, refreshTokenExpires: expires, user };
};

exports.logoutUser = async (token) => {
    try {
        const user = await TokenRepository.getUserByRefreshToken(token);
        if (user) {
            const result = await TokenRepository.clearRefreshToken(user.id);
            return result;
        }
    } catch (err) {
        next(err);
    }
};

exports.refreshUserToken = async (oldToken) => {
    if (!oldToken) throw new Error('Refresh token missing');

    const user = await TokenRepository.getUserByRefreshToken(oldToken);
    if (!user) throw new Error('Invalid or expired refresh token');

    const accessToken = signAccessToken(user);
    const { token: newRefreshToken, expires } = signRefreshToken(user);

    await TokenRepository.saveRefreshToken(user.id, newRefreshToken, expires);

    return { accessToken, refreshToken: newRefreshToken };
};
