// Authorization middleware
// This middleware checks if the user is authorized to access a route
const authorize = (role) => {
    return (req, res, next) => {
        const userRole = req.headers['x-role']; // simulate auth
        if (userRole === role) {
            next();
        } else {
            res.status(403).send('Forbidden: You do not have access');
        }
    };
};

module.exports = authorize;
