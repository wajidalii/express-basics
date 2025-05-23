const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        console.log('User role:', userRole);
        console.log('Allowed roles:', allowedRoles);
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};

module.exports = allowRoles;