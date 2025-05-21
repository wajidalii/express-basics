const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    try {

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token missing' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { protect };