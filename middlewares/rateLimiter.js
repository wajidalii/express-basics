// Rate limiting middleware
// This middleware limits the number of requests from a single IP
const rateLimiter = (limit) => {
    let count = 0;
    return (req, res, next) => {
        count++;
        if (count > limit) {
            res.send('Too many requests, please try again later.');
        } else {
            next();
        }
    };
};

module.exports = rateLimiter;  