require('dotenv').config();
const config = require('./config');
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const headerLogger = require('./middlewares/headerLogger');
const notFound = require('./middlewares/notFound');
const authorize = require('./middlewares/authorize');
const rateLimiter = require('./middlewares/rateLimiter');
const path = require('path');
const { protect } = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);
app.use(logger);
app.use(headerLogger);
app.use(helmet());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.send('Express.js is running perfectly!');
});

app.use('/auth', authRoutes);

app.get('/admin', authorize('admin'), (req, res) => {
    res.send('Welcome to the admin panel!');
});

app.use('/users', protect, userRoutes);

app.use('/tasks', taskRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running in ${config.env} mode on port ${PORT}`);
});