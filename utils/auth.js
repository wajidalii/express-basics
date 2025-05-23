const jwt = require('jsonwebtoken');
const { parseDuration } = require('./time');

exports.signAccessToken = (user) =>
    jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

exports.signRefreshToken = (user) => {
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    });
    const expires = new Date(Date.now() +
        parseDuration(process.env.REFRESH_TOKEN_EXPIRES_IN)
    );
    return { token, expires };
};
