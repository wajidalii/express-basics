require('dotenv').config();
const config = require('./config');
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const headerLogger = require('./middlewares/headerLogger');
const notFound = require('./middlewares/notFound');
const authorize = require('./middlewares/authorize');
const rateLimiter = require('./middlewares/rateLimiter');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(rateLimiter);
app.use(logger);
app.use(headerLogger);

app.get('/', (req, res) => {
    res.send('Express.js is running perfectly!');
});

app.get('/admin', authorize('admin'), (req, res) => {
    res.send('Welcome to the admin panel!');
});

app.use('/users', userRoutes);

app.use('/tasks', taskRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running in ${config.env} mode on port ${PORT}`);
});