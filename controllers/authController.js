const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = [];

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = { id: users.length + 1, name, email, password: hashedPassword };
        users.push(newUser);

        // Generate token
        const token = generateAccessToken(newUser);

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = users.find(u => u.email === email);
        if (!user) return res.status(401).send('Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send('Invalid credentials');

        const token = generateAccessToken(user);
        res.json({ user: { id: user.id, name: user.name, email }, token });
    } catch (error) {
        next(error);
    }
}