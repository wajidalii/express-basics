const app = require('./index');
const config = require('./config');

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running in ${config.env} mode on port ${PORT}`);
});