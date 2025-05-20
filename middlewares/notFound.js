// 404 Not Found middleware
// This middleware handles requests to non-existent routes
const notFound = (req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
};

module.exports = notFound;
