const http = require('http');
const app = require('./index');
const config = require('./config');
const sockets = require('./sockets');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: config.frontendUrl,
        methods: ['GET', 'POST'],
    }
});

sockets(io);

server.listen(config.port, () =>
    console.log(`Server & WebSocket listening on port ${config.port}`)
);