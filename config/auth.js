// config/auth.js
const { parseDuration } = require('../utils/time');

const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '15m';
const MAX_AGE_MS = parseDuration(REFRESH_TOKEN_EXPIRES_IN);

module.exports = {
    COOKIE_OPTIONS: {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAME_SITE || 'Lax',
        maxAge: MAX_AGE_MS,
    },
    REFRESH_TOKEN_EXPIRES_IN,
};
