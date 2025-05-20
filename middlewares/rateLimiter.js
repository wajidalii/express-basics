// Rate limiting middleware
// This middleware limits the number of requests from a single IP
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // Limit each IP to 15 requests per windowMs
    message: 'Too many requests, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;