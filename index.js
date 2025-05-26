require('dotenv').config();
const config = require('./config');
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const accountRoutes = require('./routes/accounts');
const orderRoutes = require('./routes/orders');
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
// app.use(logger);
// app.use(headerLogger);
app.use(helmet());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.send('Express.js is running perfectly!');
});

app.use('/auth', authRoutes);

app.use('/admin', adminRoutes);

app.use('/users', userRoutes);

app.use('/orders', orderRoutes);

app.use('/tasks', taskRoutes);

app.use('/accounts', protect, accountRoutes);
app.use(notFound);

app.use(errorHandler);

module.exports = app;