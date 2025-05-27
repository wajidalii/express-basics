// const cluster = require('cluster');
// const os = require('os');

// if (cluster.isMaster) {
//     const cpuCount = os.cpus().length;
//     console.log(`Master process is running. Forking ${cpuCount} workers...`);

//     for (let i = 0; i < cpuCount; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.warn(`Worker ${worker.process.pid} died. Spawning a new one.`);
//         cluster.fork();
//     });
// } else {
//     // Each worker loads the same Express app
//     const app = require('./index');
//     const config = require('./config');
//     app.listen(config.port, () =>
//         console.log(`Worker ${process.pid} listening on port ${config.port}`)
//     );
// }

const http = require('http');
const app = require('./index');
const config = require('./config');

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: config.frontendUrl,
        methods: ['GET', 'POST'],
    }
});

module.exports = io;

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    })

    socket.on('chatMessage', ({ room, msg, user }) => {
        console.log(`Chat message from ${user} in room ${room}: ${msg}`);
        io.to(room).emit('chatMessage', { user, msg, time: new Date() });
    });

    socket.on('userTyping', ({ room, user }) => {
        console.log(`User ${user} is typing in ${room}`);
        io.to(room).emit('userTyping', { user });
    });
    socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    })
});

server.listen(config.port, () =>
    console.log(`Server & WebSocket listening on port ${config.port}`)
);