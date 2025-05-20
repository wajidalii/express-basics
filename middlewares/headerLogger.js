// Header logger middleware
// This middleware logs the headers of incoming requests
const headerLogger = (req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
};

module.exports = headerLogger;
