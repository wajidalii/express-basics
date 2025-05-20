require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const headerLogger = require('./middlewares/headerLogger');
const notFound = require('./middlewares/notFound');

app.use(express.json());

app.use(logger);
app.use(headerLogger);

app.get('/', (req, res) => {
    res.send('Express.js is running perfectly!');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.use('/users', userRoutes);

app.use('/tasks', taskRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});