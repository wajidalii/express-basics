// Rate limiting middleware
// This middleware limits the number of requests from a single IP
const rateLimiter = (limit) => {
    const requestCounts = new Map(); // key: IP or user, value: count

    return (req, res, next) => {
        const ip = req.ip;
        requestCounts.set(ip, (requestCounts.get(ip) || 0) + 1);

        if (requestCounts.get(ip) > limit) {
            return res.status(429).send('Too many requests from your IP');
        }

        next();
    };
};

module.exports = rateLimiter;