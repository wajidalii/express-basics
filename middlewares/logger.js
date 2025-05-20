// Logger middleware
// This middleware logs the details of incoming requests
const logger = (req, res, next) => {
    try {
        console.log(`Date: ${new Date().toISOString()} 
        - ip: ${req.ip} method: ${req.method} url: '${req.url}'`);
        next();
    } catch (err) {
        throw new Error(`Error in middleware: ${err.message}`);
    }
};

module.exports = logger;